// require modules and set PORT
// require the express module assign it variable express
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const layout = require("express-layout");
const PORT = process.env.PORT || 4000;

//configuration settings
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// require routes .js files necessary
const routes = require("./routes/app");

// connect views folder with app.set, path.join and setup the view engine using ejs module
//return path string/ address
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// connect to database after requiring MongoURI from config/keys.js
const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err)); //We only covered async briefly

//use urlencoded() method to parse body of incoming req object -- > req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(layout());
app.use(express.static("public")); //everything in public is now accessible using / as static files

// use routes
app.use("/", routes);

// listen on port code
app.listen(PORT, function () {
  console.log(`index.js server listening on port: ${PORT}`);
});
const express = require("express");
require("dotenv").config();
const router = require("./router");
const DbConnect = require("./config/dbConfig");
const cookieParser = require("cookie-parser");

const app = express();
//all middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);

//database connection
DbConnect();

// localhost:5000
app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("server is running");
});

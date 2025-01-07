const express = require("express");
require("dotenv").config();
const router = require("./router");
const DbConnect = require("./config/dbConfig");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DbConnect();
app.use(router);

// localhost:5000
app.listen(process.env.SERVER_PORT || 8080, () => {
  console.log("server is running");
});

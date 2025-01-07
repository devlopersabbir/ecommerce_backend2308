const express = require("express");
const {
  registrationController,
  loginController,
} = require("../../controller/authController");
const router = express.Router();

// localhost:5000/api/v1/auth/registration
router.post("/registration", registrationController);
// localhost:5000/api/v1/auth/login
router.post("/login", loginController);

module.exports = router;

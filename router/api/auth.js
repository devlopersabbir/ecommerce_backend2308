const express = require("express");
const {
  registrationController,
  loginController,
} = require("../../controller/authController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

// localhost:5000/api/v1/auth/registration
router.post("/registration", registrationController);
// localhost:5000/api/v1/auth/login
router.post("/login", loginController);
//localhost:5000/api/v1/auth/user
router.get("/user", authMiddleware, (req, res) => {
  res.send("All users");
});

module.exports = router;

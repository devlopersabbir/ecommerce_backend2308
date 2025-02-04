const express = require("express");
const {
  registrationController,
  loginController,
  OtpVerifyController,
  ResendOtpController,
} = require("../../controller/authController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

// localhost:5000/api/v1/auth/registration
router.post("/registration", registrationController);
// localhost:5000/api/v1/auth/login
router.post("/login", loginController);
router.post("/otp-verity", OtpVerifyController);
router.post("/resendOtp", ResendOtpController);
//localhost:5000/api/v1/auth/user
router.get("/user", authMiddleware, (req, res) => {
  res.send("All users");
});

module.exports = router;

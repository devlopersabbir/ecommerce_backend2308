const { set } = require("mongoose");
const sendEmail = require("../helpers/sendEmail");
const EmailValidateCheck = require("../helpers/ValidateEmail");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otp = require("otp-generator-simple");

async function registrationController(req, res) {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(404).send({ error: "all field is required" });
  }
  if (!EmailValidateCheck(email)) {
    return res.send({ error: "Invalid Email" });
  }
  let existinguser = await userModel.findOne({ email });
  if (existinguser) {
    return res.status(404).send({ error: "Email already in used" });
  }

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      let user = new userModel({
        name,
        email,
        password: hash,
        role: role || "user",
      });
      await user.save();
      let otpsend = await userModel.findOneAndUpdate(
        { email },
        { $set: { otp: 1234 } },
        { new: true }
      );
      setTimeout(async () => {
        let otpsend = await userModel.findOneAndUpdate(
          { email },
          { $set: { otp: null } },
          { new: true }
        );
      }, 5000);

      sendEmail(email);
      res.send(user);
    });
  } catch (error) {
    res.status(500).send({ error });
  }
}
async function loginController(req, res) {
  let { email, password } = req.body;
  let existinguser = await userModel.findOne({ email });
  if (existinguser) {
    bcrypt.compare(
      password,
      existinguser.password,
      async function (err, result) {
        if (result) {
          if (existinguser.role == "user") {
            let userInfo = {
              name: existinguser.name,
              id: existinguser._id,
              email: existinguser.email,
              role: existinguser.role,
            };
            const token = jwt.sign({ userInfo }, process.env.jwt_secret, {
              expiresIn: "1d",
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
            });
            return res.status(200).send({
              success: "User Login Success",
              data: userInfo,
              token,
            });
          } else if (existinguser.role == "admin") {
            let userInfo = {
              name: existinguser.name,
              id: existinguser._id,
              email: existinguser.email,
              role: existinguser.role,
            };
            const token = jwt.sign({ userInfo }, process.env.jwt_secret, {
              expiresIn: "1m",
            });
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
            });

            return res.status(200).send({
              success: "Admin Login Success",
              data: userInfo,
              token,
            });
          }
        } else {
          return res.status(404).send({ error: "Invalid Password" });
        }
      }
    );
  } else {
    return res.send({ error: "Invalid Email" });
  }
}
async function OtpVerifyController(req, res) {
  const { email, otp } = req.body;
  const existinguser = await userModel.findOne({ email });
  if (existinguser) {
    if (existinguser.otp == otp) {
      existinguser.isverify = true;
      await existinguser.save();
      return res.status(200).send({ success: true, msg: "OTP Varified" });
    } else {
      return res.status(404).send({ success: false, msg: "Invalid OTP" });
    }
  } else {
    return res.status(404).send({ success: false, msg: "user not found" });
  }
}

async function ResendOtpController(req, res) {
  const { email } = req.body;
  const existinguser = await userModel.findOne({ email });
  if (existinguser) {
    let resend_otp = otp();
    existinguser.otp = resend_otp;
    await existinguser.save();

    setTimeout(async () => {
      existinguser.otp = null;
      await existinguser.save();
    }, 50000);
    sendEmail(email, resend_otp);
    return res
      .status(200)
      .send({ success: true, msg: "OTP Resend successfull" });
  } else {
    return res.status(404).send({ success: false, msg: "OTP not match" });
  }
}
module.exports = {
  registrationController,
  loginController,
  OtpVerifyController,
  ResendOtpController,
};

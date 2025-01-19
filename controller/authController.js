const EmailValidateCheck = require("../helpers/ValidateEmail");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

async function registrationController(req, res) {
  let { name, email, password } = req.body;

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
  // return;

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      let user = new userModel({
        name,
        email,
        password: hash,
      });
      await user.save();
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
    bcrypt.compare(password, existinguser.password, function (err, result) {
      if (result) {
        return res.status(200).send({ success: "Login Success" });
      } else {
        return res.status(404).send({ error: "Invalid Password" });
      }
    });
  } else {
    return res.send({ error: "Invalid Email" });
  }
}

module.exports = { registrationController, loginController };

function registrationController(req, res) {
  res.send(req.body);
}
function loginController(req, res) {
  res.send("login");
}
module.exports = { registrationController, loginController };

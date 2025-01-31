const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  let { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ success: false, msg: err.message });
      } else {
        let { role } = decoded.userInfo;
        if (role == "admin") {
          next();
        } else {
          return res.status(401).send({ success: false, msg: "Access denied" });
        }
      }
    });
  } else {
    return res.status(401).send({ success: false, msg: "Token not found" });
  }
}
module.exports = authMiddleware;

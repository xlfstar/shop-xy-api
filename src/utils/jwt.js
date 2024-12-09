const jwt = require("jsonwebtoken");

const jwtKey = "xlfstar";
const jwtExpire = 60 * 60 * 24 * 7;
const jwtSign = (data) => {
  const token = jwt.sign(data, jwtKey, { expiresIn: jwtExpire });
  return token;
};

const jwtCheck = (req, res, next) => {
  let token = req.headers.authorization;
  token = token && token.replace("Bearer ", "");
  jwt.verify(token, jwtKey, (err, data) => {
    if (err) {
      res.send({
        code: "401",
        message: "无效的token",
      });
    } else {
      req.jwtInfo = data;
      next();
    }
  });
};

module.exports = { jwtSign, jwtCheck };

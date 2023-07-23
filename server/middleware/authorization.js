const jwt = require("jsonwebtoken");

require("dotenv").config();

const authorization = (req, res, next) => {
  try {
    const token = req.headers.token;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const userId = jwt.verify(token, jwtSecretKey);
    req.userId = userId;
    next();
  } catch (Err) {
    console.log(Err);
  }
};
module.exports = {
  authorization,
};

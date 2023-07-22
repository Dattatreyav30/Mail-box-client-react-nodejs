const jwt = require('jsonwebtoken');

require('dotenv').config();


const authorization = (req, res, next) => {
  const token = req.headers.token;
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const userId = jwt.verify(token, jwtSecretKey);
  req.userId = userId;
  next();
};
module.exports = {
  authorization,
};

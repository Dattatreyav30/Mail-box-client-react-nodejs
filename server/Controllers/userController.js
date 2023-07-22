const User = require('../Models/userModel');


const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const generateAccesstoken = (userId) => {
  return jwt.sign(userId, jwtSecretKey);
};

exports.postUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const userCreation = await User.create({
      email: email,
      password: hashedPassword,
    });
    if (!userCreation) {
      throw new Error("error while creating user");
    }
    res.status(200).json({ message: "user created successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let userData = await User.findOne({
        where: { email: email },
      });
      if (!userData) {
        return res.status(401).json({ message: "user not found" });
      }
      const comparePassword = await bcrypt.compare(password, userData.password);
  
      if (!comparePassword) {
        return res.status(401).json({ message: "password is incorrect" }); 
      }
  
      res.status(200).json({
        token: generateAccesstoken(userData.id),
        message: "user logged in succesfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message }); 
    }
  };
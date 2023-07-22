const Email = require('../Models/emailModel');

const User = require('../Models/userModel');

exports.postEmail = async(req,res)=>{
    const{from,subject,content} = req.body;

    const user = await User.findByPk(req.userId)
}
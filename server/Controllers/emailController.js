const Email = require("../Models/emailModel");

const User = require("../Models/userModel");

exports.postEmail = async (req, res) => {
  try {
    const { to, subject, content } = req.body;
    const user = await User.findByPk(req.userId);

    await Email.create({
      from: user.email,
      subject: subject,
      content: content,
      to: to,
    });
    res.status(200).json({ message: "email sent succesfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "unable to send email, please try again later" });
  }
};

exports.getMails = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const mails = await Email.findAll({
      where: {
        from: user.email,
      },
    });
    res
      .status(200)
      .json({ message: "email fetched succesfully", mails: mails });
  } catch (err) {
    console.log(err)
  }
};

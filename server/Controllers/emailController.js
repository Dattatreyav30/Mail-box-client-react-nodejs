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
      isRead: false,
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
    console.log(err);
  }
};

exports.getRecievedEmails = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const mails = await Email.findAll({
      where: {
        to: user.email,
      },
    });
    res
      .status(200)
      .json({ message: "email fetched succesfully", mails: mails });
  } catch (err) {
    console.log(err);
  }
};

exports.isRead = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    await Email.update({ isRead: true }, { where: { to: user.email } });
    res.status(200).json({ message: "isRead updated succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error isRead" });
  }
};

exports.deletToEmail = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    await Email.update(
      { toTrue: true },
      { where: { to: user.email, id: req.params.id } }
    );
    res.status(200).json({ message: "email deleted succesfully" });
  } catch (Err) {
    console.log(Err);
    res.status(500).json({ message: "internal server error while deleting" });
  }
};

exports.deletFromEmail = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    await Email.update(
      { fromTrue: true },
      { where: { from: user.email, id: req.params.id } }
    );
    res.status(200).json({ message: "email deleted succesfully" });
  } catch (Err) {
    console.log(Err);
    res.status(500).json({ message: "internal server error while deleting" });
  }
};

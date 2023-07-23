const express = require("express");

const router = express.Router();

const auth = require("../middleware/authorization");

const emailController = require("../Controllers/emailController");

router.post("/send-email", auth.authorization, emailController.postEmail);

router.get("/get-emails", auth.authorization, emailController.getMails);

router.get(
  "/get-recieved-emails",
  auth.authorization,
  emailController.getRecievedEmails
);

router.get("/read", auth.authorization, emailController.isRead);

module.exports = router;

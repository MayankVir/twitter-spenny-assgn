const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.headers["x-auth-token"];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, "MayankVirmani");
    const user = await UserModel.findOne({ email: decoded.email });
    console.log("COrrect");
    res.status(200).send({ status: "ok", user: true });
  } catch (e) {
    console.log("error");
    res.status(400).send({ status: "error", user: false });
  }
});

module.exports = router;

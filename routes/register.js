const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  let user = await UserModel.findOne({
    email: req.body.email,
  }).lean();

  let userName = await UserModel.findOne({
    username: req.body.username,
  }).lean();

  if (user || userName)
    return res
      .status(200)
      .send({ status: "error", msg: "User already Exists" });

  let user_obj = {
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
  };

  const DbResponse = await UserModel.create(user_obj);

  return res
    .status(200)
    .send({ status: "ok", msg: "Account Created Successfully" });
});

module.exports = router;

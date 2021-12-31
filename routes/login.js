const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const user = await UserModel.findOne({
    username: req.body.username,
  });

  if (!user) {
    return res
      .status(200)
      .send({ status: "error", error: "Invalid Username or Password" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        username: req.body.username,
        email: user.email,
        password: user.password,
      },
      "MayankVirmani"
    );
    return res.status(200).send({ status: "ok", user: token });
  } else {
    return res.status(200).send({ status: "error", user: false });
  }
});

module.exports = router;

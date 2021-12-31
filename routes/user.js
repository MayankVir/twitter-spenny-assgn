const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post("/getUser", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
    });

    res.status(200).send({
      status: "ok",
      username: user.username,
    });
  } catch {
    res.status(400).send({
      status: "error",
      msg: "User not found",
    });
  }
});

router.post("/isFollowing", async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(200).send({ status: "error", msg: "token invalid" });
    }

    const user = await UserModel.findOne({
      username: jwt.decode(token).username,
    });

    if (!user) {
      return res.status(200).send({ status: "error", msg: "token invalid" });
    }

    const check = user.following.filter(
      (each) => each.username === req.body.username
    );

    if (check.length) {
      res.status(200).send({
        status: "ok",
        following: true,
      });
    } else {
      res.status(200).send({
        status: "ok",
        following: false,
      });
    }
  } catch {
    res.status(400).send({
      status: "error",
      msg: "User not found",
    });
  }
});

router.post("/doFollow", async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(200).send({ status: "error", msg: "token invalid" });
    }

    // console.log("TOken: ", token);

    const username = jwt.decode(token).username;

    // console.log("username: ", username);

    if (!username) {
      return res.status(200).send({ status: "error", msg: "token invalid" });
    }
    const userToFollow = req.body.username;

    // console.log("UserToFollow: ", userToFollow);

    const finalUser = {
      username: userToFollow,
    };

    const user = await UserModel.updateOne(
      {
        username: username,
      },
      {
        $push: {
          following: finalUser,
        },
      }
    );

    console.log(user);

    res.status(200).send({ status: "ok", done: "true" });
  } catch {
    res.status(200).send({ status: "error", msg: "Something went wrong" });
  }
});

router.post("/unFollow", async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(200).send({ status: "error", msg: "token invalid" });
    }

    const username = jwt.decode(token).username;

    if (!username) {
      return res.status(200).send({ status: "error", msg: "token invalid" });
    }
    const userToRemove = req.body.username;

    const user = await UserModel.findOne({
      username: username,
    });

    let updatedFollowing = [];

    updatedFollowing = user.following.filter(
      (each) => each.username !== userToRemove
    );

    const finalUsers = await UserModel.updateOne(
      {
        username: username,
      },
      {
        $set: {
          following: updatedFollowing,
        },
      }
    );

    console.log(finalUsers);

    res.status(200).send({ status: "ok", done: "true" });
  } catch {
    res.status(200).send({ status: "error", msg: "Something went wrong" });
  }
});

module.exports = router;

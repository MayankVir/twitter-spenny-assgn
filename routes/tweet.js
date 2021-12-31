const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post("/newTweet", async (req, res) => {
  const tweetMsg = req.body.tweetMsg;
  const token = req.headers["x-auth-token"];
  const user = jwt.decode(token);

  if (!token) {
    return res.status(200).send({ status: "token invalid" });
  }

  const tweet = {
    tweet: tweetMsg,
    username: user.username,
    createdAt: Date.now(),
  };

  const finalUser = await UserModel.updateOne(
    {
      email: user.email,
    },
    {
      $push: {
        tweets: tweet,
      },
    }
  );

  if (!tweetMsg || !token || !user.email || !tweet || !finalUser) {
    return res
      .status(404)
      .send({ status: "error", msg: "something went wrong" });
  }

  return res.status(200).send({ status: "ok", msg: "Tweet created" });
});

router.get("/getTweets", async (req, res) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(200).send({ status: "token invalid" });
  }

  const user = jwt.decode(token);

  const userData = await UserModel.findOne({ email: user.email });

  let allFinalTweets = [];

  allFinalTweets = userData.tweets;

  const allUsernames = [];

  userData.following.forEach((eachFollower) => {
    allUsernames.push(eachFollower.username);
  });

  const allTweets = await UserModel.find({ username: { $in: allUsernames } });

  allTweets.forEach((eachUser) => {
    allFinalTweets = allFinalTweets.concat(eachUser.tweets);
  });
  console.log(allFinalTweets);

  if (userData && token && user) {
    return res.status(200).send({ status: "ok", tweets: allFinalTweets });
  }

  return res.status(400).send({ status: "error", msg: "something went wrong" });
});

module.exports = router;

import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import tweetService from "../../services/tweet.service";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const TweetBox = ({ showTweet }) => {
  const [tweetMessage, setTweetMessage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();
    console.log("Sending Tweet...");
    if (tweetMessage.length) {
      tweetService
        .postTweet(tweetMessage)
        .then((response) => {
          console.log("Response on feed: ", response);
          if (response.status === "ok") {
            toast.success("Tweet Created");
            showTweet();
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Please write something");
    }
    setTweetMessage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${
              jwt_decode(localStorage.getItem("token")).username
            }.svg`}
          />
          <textarea
            onChange={(e) => {
              console.log(tweetMessage);
              setTweetMessage(e.target.value);
            }}
            value={tweetMessage}
            placeholder="What's happening?"
            name="text"
            wrap="soft"
            maxLength="140"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;

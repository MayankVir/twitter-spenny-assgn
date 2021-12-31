/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "http://localhost:5000";
// const token = localStorage.getItem("token");

let axiosConfig = {
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
};

const postTweet = async (tweetMsg) => {
  return await axios
    .post(
      BASE_URL + "/api/tweet/newTweet",
      { tweetMsg },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      if (response.data.status === 200) {
        return response.data;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return { status: "error", msg: "something went wrong" };
    });
};
const getTweets = async () => {
  return await axios
    .get(BASE_URL + "/api/tweet/getTweets", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.data.status === "ok") {
        return response.data;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return { status: "error", msg: "something went wrong" };
    });
};

export default {
  postTweet,
  getTweets,
};

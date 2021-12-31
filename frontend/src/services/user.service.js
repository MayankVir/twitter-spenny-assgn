/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "http://localhost:5000";
// const token = localStorage.getItem("token");

let axiosConfig = {
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
};

const searchUser = async (username) => {
  return await axios
    .post(
      BASE_URL + "/api/user/getUser",
      { username },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      return { status: "error", msg: "User not found" };
    });
};

const isFollowing = async (username) => {
  return await axios
    .post(
      BASE_URL + "/api/user/isFollowing",
      { username },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      // console.log(response);
      if (response.data.status === "ok") {
        return response.data;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return { status: "error", msg: "User not found" };
    });
};

const doFollow = async (username) => {
  return await axios
    .post(
      BASE_URL + "/api/user/doFollow",
      { username },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then((response) => console.log("Response on service: ", response));
};

const unFollow = async (username) => {
  return await axios
    .post(
      BASE_URL + "/api/user/unFollow",
      { username },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then((response) => console.log("Response on service: ", response));
};

export default {
  searchUser,
  isFollowing,
  doFollow,
  unFollow,
};

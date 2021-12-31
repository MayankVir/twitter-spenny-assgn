/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "http://localhost:5000";

let axiosConfig = {
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
};
const login = async (username, password) => {
  return await axios
    .post(BASE_URL + "/api/login", {
      username,
      password,
    })
    .then((response) => {
      return response;
    });
};

const register = async (email, username, password) => {
  return await axios
    .post(BASE_URL + "/api/register", {
      email,
      username,
      password,
    })
    .then((response) => {
      if (response.data.status === "ok") {
        return response.data.msg;
      } else {
        return response.data.msg;
      }
    })
    .catch((err) => {
      return "Something went wrong";
    });
};

const verifyToken = async () => {
  return await axios
    .get(BASE_URL + "/api/verify", axiosConfig)
    .then((response) => {
      console.log("here: ", response);
      return response.data;
    })
    .catch((err) => {
      return { status: "error", user: false };
    });
};

export default {
  login,
  register,
  verifyToken,
};

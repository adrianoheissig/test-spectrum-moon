import axios from "axios";
import jwt_decode from "jwt-decode";

import api from "./api.service";

const API_URL = "http://localhost:5000/";

const register = (username, email, password) => {
  return axios.post(API_URL + "users", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  localStorage.removeItem("user");
  return api
    .post("login", {
      email,
      password,
    })
    .then(
      (response) => {
        if (response.data.accessToken) {
          const decoded = jwt_decode(response.data.accessToken);
          decoded.token = response.data.accessToken;
          localStorage.setItem("user", JSON.stringify(decoded));
        }
        return response.data;
      },
      (error) => {
        console.log(error);
      }
    );
};

const logout = () => {
  return axios.post(API_URL + "logout").then((response) => {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem("user");
    return response.data;
  });
};

const getCurrentUser = () => {
  validateToken();
  return JSON.parse(localStorage.getItem("user"));
};

const validateToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentDate = new Date();
  if (user && user.exp * 1000 > currentDate.getTime()) {
    return true;
  } else {
    logout();
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;

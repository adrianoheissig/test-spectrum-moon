import axios from "axios";
import jwt_decode from "jwt-decode";

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
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then(
      (response) => {
        if (response.data.accessToken) {
          const decoded = jwt_decode(response.data.accessToken);
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
  const currentUser = getCurrentUser();
  return axios.post(API_URL + "logout", currentUser).then((response) => {
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
  console.log(user);
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

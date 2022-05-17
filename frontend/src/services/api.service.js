import axios from "axios";

const API_URL = "http://localhost:5000/";

const api = axios.create({
  baseURL: API_URL,
});
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  api.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
}

export default api;

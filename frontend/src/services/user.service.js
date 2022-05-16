import axios from "axios";

const API_URL = "http://localhost:5000/";

const getUserInformation = () => {
  return axios.get(API_URL + "user").then(res => {
      console.log(res)
  })
};

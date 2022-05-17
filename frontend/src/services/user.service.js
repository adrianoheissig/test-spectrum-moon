import api from "./api.service";

const getUserInformation = (id) => {
  return api.get(`user/${id}`).then((response) => {
    return response.data;
  });
};

const UserSerice = {
  getUserInformation,
};

export default UserSerice;

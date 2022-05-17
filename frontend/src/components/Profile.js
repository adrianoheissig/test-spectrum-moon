import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Profile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    let user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }

    UserService.getUserInformation(user.userId).then(
      (res) => {
        setCurrentUser(res[0]);
      },
      (err) => console.log(err)
    );
  }, [navigate]);

  let template = <div></div>;

  if (currentUser) {
    console.log(currentUser);
    template = (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.name}</strong>
          </h3>
        </header>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      </div>
    );
  }

  return template;
};

export default Profile;

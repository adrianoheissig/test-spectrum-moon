import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBootStrap from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import AuthService from "../services/auth.service";

const Navbar = () => {
  const [componentLoginLogout, setComponentLoginLogout] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    let user = AuthService.getCurrentUser();

    const LoginLogout = !user ? (
      <Nav.Link eventKey="1">Login</Nav.Link>
    ) : (
      <Nav.Link eventKey="2">Logout</Nav.Link>
    );

    setComponentLoginLogout(LoginLogout);
  }, []);

  const handleLogout = (event) => {
    console.log(event);
    if (event === "1") {
      navigate("/login");
    } else {
      AuthService.logout().then(
        () => {
          navigate("/dashboard");
        },
        (error) => {
          console.log(error.response);
        }
      );
    }
  };

  return (
    <NavbarBootStrap bg="dark" variant="dark">
      <Container fluid>
        <NavbarBootStrap.Brand href="/">Spectrum Moon</NavbarBootStrap.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Profile">Profile</Nav.Link>
        </Nav>
        <Nav onSelect={handleLogout}>
          <Nav.Item>{componentLoginLogout}</Nav.Item>
        </Nav>
      </Container>
    </NavbarBootStrap>
    // <nav
    //   className="navbar is-light"
    //   role="navigation"
    //   aria-label="main navigation"
    // >
    //   <div className="container">
    //     <div className="navbar-brand">
    //       <a className="navbar-item" href="https://bulma.io">
    //         <img
    //           src="https://bulma.io/images/bulma-logo.png"
    //           width="112"
    //           height="28"
    //           alt="logo"
    //         />
    //       </a>

    //       <a
    //         href="/"
    //         role="button"
    //         className="navbar-burger burger"
    //         aria-label="menu"
    //         aria-expanded="false"
    //         data-target="navbarBasicExample"
    //       >
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //       </a>
    //     </div>

    //     <div id="navbarBasicExample" className="navbar-menu">
    //       <div className="navbar-start">
    //         <a href="/" className="navbar-item">
    //           Home
    //         </a>
    //       </div>

    //       <div className="navbar-end">
    //         <div className="navbar-item">
    //           <div className="buttons">
    //             <button onClick={Logout} className="button is-light">
    //               Log Out
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;

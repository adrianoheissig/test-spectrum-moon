import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;

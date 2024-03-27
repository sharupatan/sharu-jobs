import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Navbars = () => {
  const loginStatus = localStorage.getItem("cred");
  const handleLogout = () => {
    localStorage.removeItem('cred')
    window.location.replace('/login')
  }
  return (
    <Navbar className="bg-dark navbar-dark">
      <Container>
        <Link to="/" className="btn btn-primary me-2">
          Sharu Jobs
        </Link>
        {loginStatus === null ? (
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        ) : (
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        )}

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <Link to="/" className="btn badge badge-info">
              Sharu khan
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navbars;

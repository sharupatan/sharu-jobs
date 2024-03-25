import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Navbars = () => (
  <Navbar className="bg-dark navbar-dark">
    <Container>
      <Link to="/" className="btn btn-primary me-2">
        Sharu Jobs
      </Link>
      <Link to="/login" className="btn btn-secondary">
        Login
      </Link>
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

export default Navbars;

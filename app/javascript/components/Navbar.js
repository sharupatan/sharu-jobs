import React, { useEffect, useState } from "react";
import { Button,Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { redirect_root_path } from "./utilities/redirections";
import { get_csrf_token } from "./utilities/tokens";
import { DOMAIN } from "./utilities/navigations";
import verify_user from "./utilities/authenticate";

const Navbars = () => {
  const [loading, setLoading] = useState(true);
  const [loginProfile, setLoginProfile] = useState({ email: "not defined" });

  useEffect(() => {
    const getprofile = async () => {
      const profile = await verify_user(true);
      setLoading(false);
      setLoginProfile(profile);
    }
    getprofile()
  }, []);

  const handleLogout = () => {
    const url = `${DOMAIN}/users/sign_out`;
    const options = {
      method: "DELETE",
      headers: { Content_Type: "application/json", "X-CSRF-Token": get_csrf_token() },
    };
    fetch(url, options)
      .then((r) => r.json())
      .then((d) => {
        if (d?.status === 200) {
          redirect_root_path();
        }
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <Navbar className="bg-dark navbar-dark">
      <Container>
        <Link to="/" className="btn btn-primary me-2">
          Sharu Jobs
        </Link>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <Link to="/" className="btn badge badge-info">
              {loading ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </Button>
              ) : (
                loginProfile.name || loginProfile.email
              )}
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navbars;

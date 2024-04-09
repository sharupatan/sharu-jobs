import React, { useEffect, useState } from "react";
import { Button,Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { redirect_root_path } from "./utilities/redirections";

const checkAuth = async (domain) => {
  const url = `${domain}/login_status`;
  let loginProfile = {};
  await fetch(url)
    .then((r) => r.json())
    .then((d) => {
      loginProfile = d;
    })
    .catch((e) => console.log(e.message));
  return loginProfile;
};

const Navbars = () => {
  const domain = useSelector((state) => state.domain.value);
  const csrf = useSelector((state) => state.utilities.value.csrfToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loginProfile, setLoginProfile] = useState({ email: "not defined" });

  useEffect(() => {
    const getprofile = async () => {
      const profile = await checkAuth(domain);
      setLoading(false);
      setLoginProfile(profile);
    }
    getprofile()
  }, []);

  const handleLogout = () => {
    const url = `${domain}/users/sign_out`;
    const options = {
      method: "DELETE",
      headers: { Content_Type: "application/json", "X-CSRF-Token": csrf },
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

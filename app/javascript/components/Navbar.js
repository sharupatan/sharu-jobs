import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { redirectToHome } from "../redux/slices/utilitiesSlice";

const getCsrfToken = () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  return csrfToken;
};

const checkAuth = async (domain) => {
  const url = `${domain}/login_status`;
  let isLogin = false;
  await fetch(url)
    .then((r) => r.json())
    .then((d) => {
      isLogin = d;
    })
    .catch((e) => console.log(e.message));
  return isLogin;
};

const Navbars = () => {
  const domain = useSelector((state)=>state.domain.value)
  const dispatch = useDispatch()
  const [loginStatus, setLoginStatus] = useState(checkAuth(domain))
  const handleLogout = () => {
    const url = `${domain}/users/sign_out`
    const options = {
      method: 'DELETE',
      headers: { 'Content_Type': 'application/json', 'X-CSRF-Token': getCsrfToken()},
    }
    fetch(url,options).then((r)=>r.json()).then((d)=>{
      if(d?.status === 200){
        dispatch(redirectToHome())
      }
    }).catch((e)=>console.log(e.message))
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

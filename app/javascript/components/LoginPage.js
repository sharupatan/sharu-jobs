import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {redirect_root_path} from './utilities/redirections'
import {get_csrf_token} from './utilities/tokens'
import { DOMAIN } from "./utilities/navigations";
import verify_user from "./utilities/authenticate";

const LoginPage = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [loginStatus, setLoginStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const privateRoute = async () => {
    const isAuthenticated = await verify_user();
    if (isAuthenticated) {
      redirect_root_path()
    }
  };

  const saveProfileData = (d) => {
    const payload = {
      email: d?.email,
      isGoogleAuthorised: d?.email,
    };
    const url = `${DOMAIN}/users/sign_in`;
    const options = {
      method: "POST",
      headers: { Content_Type: "application/json", "X-CSRF-Token": get_csrf_token() },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then(async (res) => {
        if (res.status !== 200) {
          throw new Error(await res.text());
        } else {
          return await res.json();
        }
      })
      .then((data) => {
        if (data?.data?.email) {
          redirect_root_path();
        } else {
          setLoginStatus(data.message);
        }
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    if (user?.access_token) {
      const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`;
      const options = {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((d) => {
          saveProfileData(d);
        })
        .catch((e) => console.log(e));
    }

    setLoading(false);
  }, [user]);

  useEffect(()=>{
    privateRoute()
  },[])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("login failed", error),
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const url = `${DOMAIN}/users/sign_in`;

    const options = {
      method: "POST",
      headers: { Content_Type: "application/json", "X-CSRF-Token": get_csrf_token() },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then(async (res) => {
        if (res.status !== 200) {
          throw new Error(await res.text());
        } else {
          return await res.json();
        }
      })
      .then((data) => {
        if (data?.data?.email) {
          redirect_root_path();
        } else {
          setLoginStatus(data.message);
        }
      })
      .catch((e) => console.log(e.message));
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            {...register("email", {
              required: true,
              pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            })}
          />
          <Form.Text className="text-muted">
            {errors.email && (
              <span className="text-danger">Should be in valid format</span>
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          <Form.Text className="text-muted">
            {errors.password && (
              <span className="text-danger">
                This field is required with min 6 digits
              </span>
            )}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button type="submit">Submit</Button>
        {loginStatus !== "" && (
          <span className="text-danger">{loginStatus}</span>
        )}
      </Form>
      <hr />
      <Link to="/register" className="btn btn-primary mt-3 mb-2">
        Signup
      </Link>
      <button onClick={login}>Sign in with Google 🚀 </button>
    </Container>
  );
};

export default LoginPage;

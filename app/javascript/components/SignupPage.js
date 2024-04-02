import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

const getCsrfToken = () => {
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  return csrfToken;
};

const checkAuth = async () => {
  const domain = useSelector((state)=>state.domain.value)
  const url = `${domain}/login_status`;
  let isLogin = false;
  await fetch(url)
    .then((r) => r.json())
    .then((d) => {
      isLogin = d;
    })
    .catch((e) => console.log(e.message));
    console.log(isLogin)
  return isLogin;
};

const privateRoute = async () => {
  const isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    window.location.replace("/");
  }
};

const SignupPage = () => {
  const domain = useSelector((state)=>state.domain.value)
  const [loginStatus, setLoginStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  useEffect(() => {
    privateRoute();
  }, []);

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const url = `${domain}/users`;
    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        "X-CSRF-Token": getCsrfToken(),
      },
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
      .then((data) => console.log(data))
      .catch((e) => setLoginStatus(e.message));
  };

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
              <span className="text-info">Should be in valid format</span>
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
    </Container>
  );
};

export default SignupPage;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({defaultValues:{email: '', password: ''}});

  useEffect(() => {
    const loginStatus = localStorage.getItem("cred");
    if (loginStatus !== null) {
      window.location.replace("/");
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      email: data.email,
      password: data.password
    }
    const url = 'http://localhost:3000/signup';
    const options = {
      method: 'POST',
      headers: { 'Content_Type': 'application/json'},
      body: JSON.stringify(payload)
    };
    fetch(url,options).then((res)=>res.json()).then((data)=>console.log(data));
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
            {errors.email && <span className="text-danger">Should be in valid format</span>}
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
              <span className="text-danger">This field is required with min 6 digits</span>
            )}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;

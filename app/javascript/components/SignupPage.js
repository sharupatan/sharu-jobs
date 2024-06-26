import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { redirect_root_path } from "./utilities/redirections";
import { get_csrf_token } from "./utilities/tokens";
import { DOMAIN } from "./utilities/navigations";
import verify_user from "./utilities/authenticate";

const privateRoute = async () => {
  const isAuthenticated = await verify_user();
  if (isAuthenticated) {
    redirect_root_path();
  }
};

const SignupPage = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const [loading,setLoading] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  useEffect(() => {
    privateRoute();
    setLoading(false)
  }, []);

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const url = `${DOMAIN}/users`;
    const options = {
      method: "POST",
      headers: {
        Content_Type: "application/json",
        "X-CSRF-Token": get_csrf_token(),
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
      .then((data) => {
        if(data?.status?.message.length > 0){
          setLoginStatus(data?.status?.message.join(','))
        }else{
          redirect_root_path();
        }
      }
        )
      .catch((e) =>{console.log(e.message); setLoginStatus(e.message)});
  };
  
  if(loading){
    return <Loader/>
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
      <Link to="/login" className="btn btn-primary mt-3">
          Login
      </Link>

      <hr/>

      {/* <div className="form-container mb-4">
        <p className="heading">Confirm your email</p>
        <p className="content">
          We have sent OTP to registered email, please confirm your email
        </p>

        <form onSubmit={handleValidateOTP}>
          <input type="hidden" name="id" value={user.id} />

          <input type="text" name="otp" placeholder="Type OTP" />

          <button type="submit">Validate OTP</button>
        </form>

        <form onSubmit={handleResendOTP}>
          <input type="hidden" name="id" value={user.id} />

          <p className="text-center p-2 d-flex">
            <button type="submit" style={{ color: '#0073ff', background: 'none' }}>Resend OTP</button>
          </p>
        </form>
      </div> */}
    </Container>
  );
};

export default SignupPage;

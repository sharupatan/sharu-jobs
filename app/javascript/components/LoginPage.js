import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const setType = (status) => {
  return status ? 'text' : 'password'
}

const checkValidity = (email, pass) => {
  console.log(email.endsWith('@gmail.com') && (pass.length > 6))
  const cond = email.endsWith('@gmail.com') && (pass.length >= 6)
  return cond ? 'success' : 'danger'
}

const LoginPage = () => {
  const [loginEmail,setLoginEmail] = useState('')
  const [loginPass,setLoginPass] = useState('')
  const [loginPassHideStatus, setLoginPassHideStatus] = useState(false)
  const passInputType = useMemo(()=>setType(loginPassHideStatus),[loginPassHideStatus])
  const isDetailsValid = useMemo(()=>checkValidity(loginEmail,loginPass),[loginEmail,loginPass])

  useEffect(()=>{
    const loginStatus = localStorage.getItem('cred')
    if(loginStatus !== null){
      window.location.replace('/')
    }
  },[])

  const onChangeEmail = (e) => {
    setLoginEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setLoginPass(e.target.value)
  }

  const onChangePassHideStatus = () => {
    setLoginPassHideStatus(!loginPassHideStatus)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(loginEmail,loginPass)
    // localStorage.setItem('cred',JSON.stringify('login key is so and so'))
  }



  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={onChangeEmail} value={loginEmail}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type={passInputType} placeholder="Password" onChange={onChangePassword} value={loginPass}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" onChange={onChangePassHideStatus} checked={loginPassHideStatus}/>
        </Form.Group>
        <Button type="submit" variant={isDetailsValid}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;

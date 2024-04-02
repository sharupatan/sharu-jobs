import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { HomePage, LoginPage, Navbars, SignupPage } from "../components";

const checkAuth = async () => {
  const url = "http://localhost:3000/login_status";
  let isLogin = false;
  await fetch(url)
    .then((r) => r.json())
    .then((d) => {
      isLogin = d;
    })
    .catch((e) => console.log(e.message));
  return isLogin;
};

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const checkUserAuth = async () => {
      try{
        const url = 'http://localhost:3000/login_status'
        const response = await fetch(url)
        const isLogin = await response.json()
        setIsAuthenticated(isLogin)
      } catch(e){
        console.log(e.message)
        setIsAuthenticated(false)
      }finally{
        setLoading(false)
      }
    }
    checkUserAuth()
  },[])

  console.log('pr triggered....!',isAuthenticated,loading)
  if(loading){
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

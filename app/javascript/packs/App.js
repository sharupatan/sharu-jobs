import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { HomePage, LoginPage, Navbars } from "../components";

const CheckAuth = () => {
  const isLogin = localStorage.getItem('cred')
  console.log(isLogin)
  if(isLogin === null){
    return false
  }
  return true
}

const PrivateRoute = () => {
  const isAuthenticated = CheckAuth()
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />
}


const App = () => {
  return (
    <Router basename="/">
      <Navbars />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;



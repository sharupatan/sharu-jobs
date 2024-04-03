import React from "react";

const Loader = () => (
  <div className="w-100 d-flex flex-row justify-content-center mt-5">
    <div className="spinner-grow text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div className="spinner-grow text-dark" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;

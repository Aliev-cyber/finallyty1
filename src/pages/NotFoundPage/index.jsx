import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 
import img from "./404.jpg"

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img
        src={img}
        alt="Not Found"
        className="background-image"
      />
      <div className="content">
        <Link to="/" className="go-back-link">
          Go Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

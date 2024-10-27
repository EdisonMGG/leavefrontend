import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/fisat.jpg'; // Adjust the path based on your file structure
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div
            className="landing-container"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Use the imported image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
            }}
        >
            <div className="heading-box">
                <h1 className="college-name">Welcome to FISAT !</h1>
            </div>
            <div className="dropdown login-button-container">
                <button 
                    className="btn btn-primary dropdown-toggle login-button" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    <h3>DEPARTMENT LOGIN</h3>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><Link className="dropdown-item" to="/home">MCA DEPARTMENT</Link></li>
                    <li><Link className="dropdown-item" to="/about">BTECH DEPARTMENT</Link></li>
                    <li><Link className="dropdown-item" to="/contact">MBA DEPARTMENT</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default LandingPage;

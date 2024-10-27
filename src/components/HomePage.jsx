import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Add your custom CSS file

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="alert alert-primary welcome-banner">
                <center><b><h3>Welcome To Leave Management App Of MCA Department</h3></b></center>
            </div>

            <div className="container">
                <div className="content-box">
                    <div className="buttons-section">
                        <Link className="btn btn-primary custom-button" to="/studlogin">
                            <h3>STUDENT LOGIN</h3>
                        </Link>

                        <Link className="btn btn-primary custom-button" to="/facultylogin">
                            <h3>FACULTY LOGIN</h3>
                        </Link>

                        <Link className="btn btn-danger custom-button" to="/HodSignIn">
                            <h3>HOD / GROUP-ADVISOR LOGIN</h3>
                        </Link>

                        <center className="signup-section">
                            <h3>NEW STUDENTS -> SIGN UP 👇</h3>
                            <Link to="/studsignup" className="signup-link">
                                <h4>Click Here</h4>
                            </Link>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

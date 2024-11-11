import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FacultyLogin.css'; // Import the CSS file

const FacultyLogin = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        "faculty_username": "",
        "faculty_password": ""
    });
    const [loading, setLoading] = useState(false);

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        if (!data.faculty_username || !data.faculty_password) {
            alert("Please fill in all fields");
            return;
        }
        setLoading(true);
        axios.post("http://localhost:8080/facultylogin", data)
            .then(response => {
                setLoading(false);
                if (response.data.status === "success") {
                    navigate("/facultyaddleave");
                } else if (response.data.status === "User Not Found") {
                    alert("Username does not exist");
                } else {
                    alert("Incorrect password");
                }
            })
            .catch(error => {
                setLoading(false);
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className="faculty-login-container">
            <div className="alert alert-primary" role="alert">
                <h3 className="text-center">FACULTY LOGIN</h3>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card login-card">
                            <div className="card-body">
                                <form>
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <label className="form-label">Enter your Email</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="faculty_username" 
                                                value={data.faculty_username} 
                                                onChange={inputHandler} 
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Enter your Password</label>
                                            <input 
                                                type="password" 
                                                name="faculty_password" 
                                                className="form-control" 
                                                value={data.faculty_password} 
                                                onChange={inputHandler} 
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <center>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-success btn-login" 
                                                    onClick={readValue}
                                                    disabled={loading}
                                                >
                                                    {loading ? "Logging in..." : "Login"}
                                                </button>
                                                <br /><br />
                                                <Link to="/home" className="back-link">Back to home page</Link>
                                            </center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyLogin;
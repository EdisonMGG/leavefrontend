import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudLogin.css'; // External CSS

const StudLogin = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        student_username: "",
        student_password: "",
       
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const validateForm = () => {
        if (!data.student_username || !data.student_password) {
            setErrorMessage("All fields are required!");
            return false;
        }
        return true;
    }

    const readValue = () => {
        if (!validateForm()) return;

        setLoading(true);
        axios.post("http://localhost:8080/studlogin", data)
            .then((response) => {
                setLoading(false);
                if (response.data.status === "success") {
                    // Store the roll number in sessionStorage
                    sessionStorage.setItem("student_rollnum", response.data.student_rollnum);
                    navigate("/studaddleave");
                } else if (response.data.status === "User Not Found") {
                    setErrorMessage("Username Does Not Exist");
                } else {
                    setErrorMessage("Incorrect Password");
                }
            })
            .catch((error) => {
                setLoading(false);
                setErrorMessage(error.message);
            });
    }

    return (
        <div className="login-container">
            <div className="alert alert-primary" role="alert">
                <center><h3><b>STUDENT LOGIN</b></h3></center>
            </div>
            <div className="card login-card w-50 mx-auto text-bg-light">
                <div className="card-body">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="student_username" className="form-label">Enter your Email</label>
                        <input type="text" className="form-control" name="student_username" value={data.student_username} onChange={inputHandler} placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="student_password" className="form-label">Enter your Password</label>
                        <input type="password" name="student_password" className="form-control" value={data.student_password} onChange={inputHandler} placeholder="Password" />
                    </div>
                    
                    <div className="form-group text-center">
                        <button className="btn btn-success login-btn" onClick={readValue} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <br /><br />
                        <Link to="/home" className="back-link">Back to Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudLogin;

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HodLogin.css';  

const HodLogin = () => {
    let navigate = useNavigate();

    const [data, setData] = useState({
        HOD_username: '',
        HOD_Password: '',
    });

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        if (!data.HOD_username || !data.HOD_Password) {
            alert('Please fill in both fields');
            return;
        }
        axios.post('http://localhost:8080/HodSignIn', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    navigate('/searchleavestud');
                } else {
                    if (response.data.status === 'User Not Found') {
                        alert('UserName Does Not Exist');
                    } else {
                        alert('Incorrect Password');
                    }
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h3>HOD / GROUP ADVISOR LOGIN.............</h3>
            </div>
            <div className="login-card">
                <div className="login-card-body">
                    <div className="form-group">
                        <label htmlFor="HOD_username">Enter UserName</label>
                        <input
                            type="text"
                            className="form-control"
                            name="HOD_username"
                            value={data.HOD_username}
                            onChange={inputHandler}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="HOD_Password">Enter Password</label>
                        <input
                            type="password"
                            name="HOD_Password"
                            className="form-control"
                            value={data.HOD_Password}
                            onChange={inputHandler}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="form-action">
                        <button className="btn btn-login" onClick={readValue}>
                            Login
                        </button>
                        <Link to="/home" className="btn btn-back">Back to Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HodLogin;

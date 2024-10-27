import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const StudSignup = () => {

    const [data, setData] = useState(
        {
            "student_username": "",
            "student_rollnum":"",
            "student_password": "",
            "confirm_stud_password":""
        }
    )

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        if (data.student_password !== data.confirm_stud_password) {
            alert("Password and Confirm Password Missmach")
            return
        }
        axios.post("http://localhost:8080/studsignup", data)
            .then(
                (response) => {
                    if (response.data.status == "success") {
                        alert("Sign Up Succesfully")
                    } else {
                        alert("Sign Up Failed")
                    }
                }
            ).catch(
                (error) => {
                    alert(error.message)
                }
            )
    }

    return (
        <div>
            <div class="alert alert-primary" role="alert">
                <center><b><h3>
                    New Students Sign Up Portal
                </h3></b></center>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                        <div class="card w-50 mx-auto border-rounded text-bg-light border-info">
                            <div class="card-body">

                                <div className="row g-4">
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="" className="form-label">Enter your Email</label>
                                        <input type="text" className="form-control" name='student_username' value={data.student_username} onChange={inputHandler} />
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="" className="form-label">Enter your Roll Number</label>
                                        <input type="text" className="form-control" name='student_rollnum' value={data.student_rollnum} onChange={inputHandler} />
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="" className="form-label">Enter your Password</label>
                                        <input type="password" name="student_password" id="" className="form-control" value={data.student_password} onChange={inputHandler} />
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <label htmlFor="" className="form-label">Re Enter your Password</label>
                                        <input type="password" name="confirm_stud_password" id="" className="form-control" value={data.confirm_stud_password} onChange={inputHandler}/>
                                    </div>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                        <center>
                                            <button className="btn btn-success" onClick={readValue}>Sign UP</button>
                                            <br /><br /><Link to="/home"> Back to home page</Link>
                                        </center>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default StudSignup
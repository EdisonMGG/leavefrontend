import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation

const FacultyAddLeave = () => {
    const [data, setData] = useState({
        name: "",
        IdNo: "",
        Sdate: "",
        Edate: "",
        Tdate: "",
        reasonforleave: "",
        file: null
    });

    const navigate = useNavigate(); // To navigate to login after logout

    // Input handler for text and date inputs
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    // Handler for file input
    const fileHandler = (event) => {
        setData({ ...data, file: event.target.files[0] });
    };

    // Read and submit form data with file upload
    const readValue = () => {
        if (!data.name || !data.IdNo || !data.Sdate || !data.Edate || !data.Tdate || !data.reasonforleave || !data.file) {
            alert("Please fill all the fields and upload a file");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("IdNo", data.IdNo);
        formData.append("Sdate", data.Sdate);
        formData.append("Edate", data.Edate);
        formData.append("Tdate", data.Tdate);
        formData.append("reasonforleave", data.reasonforleave);
        formData.append("file", data.file);

        axios.post("http://localhost:8080/facultyaddleave", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data.status === "success") {
                alert("Leave added successfully");
            } else {
                alert("Failed to add leave");
            }
        }).catch((error) => {
            console.error("Error adding leave:", error);
        });
    };

    // Logout functionality
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove authentication token from storage
        alert("Logged out successfully!");
        navigate('/FacultyLogin'); // Redirect to login page (assuming '/login' is the login route)
    };

    return (
        <div>
            <div className="alert alert-primary" role="alert">
                <center><b><h3>FILL YOUR LEAVE FORM</h3></b></center>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-4">
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Enter Your Name</label>
                                <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Enter Your ID Number</label>
                                <input type="text" className="form-control" name="IdNo" value={data.IdNo} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Enter the Starting Date Of Your Leave</label>
                                <input type="date" className="form-control" name="Sdate" value={data.Sdate} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Enter the Ending Date Of Your Leave</label>
                                <input type="date" className="form-control" name="Edate" value={data.Edate} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Today's Date</label>
                                <input type="date" className="form-control" name="Tdate" value={data.Tdate} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Reason For Your Leave</label>
                                <textarea name="reasonforleave" value={data.reasonforleave} onChange={inputHandler} className="form-control"></textarea>
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Upload Supporting Document</label>
                                <input type="file" className="form-control" name="file" onChange={fileHandler} />
                            </div>
                        </div>

                        {/* Center the buttons */}
                        <div className="row mt-4">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-success me-2" onClick={readValue}>ADD</button>
                                <button className="btn btn-danger" onClick={handleLogout}>LOGOUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacultyAddLeave;

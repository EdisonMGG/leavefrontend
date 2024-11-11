import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyAddLeave = () => {
    const [data, setData] = useState({
        name: "",
        IdNo: "",
        leaveType: "",
        Sdate: "",
        Edate: "",
        Tdate: "",
        reasonforleave: "",
        file: null
    });

    const navigate = useNavigate();

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const fileHandler = (event) => {
        setData({ ...data, file: event.target.files[0] });
    };

    const readValue = () => {
        if (!data.name || !data.IdNo || !data.leaveType || !data.Sdate || !data.Edate || !data.Tdate || !data.reasonforleave || !data.file) {
            alert("Please fill all the fields and upload a file");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("IdNo", data.IdNo);
        formData.append("leaveType", data.leaveType);
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

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        alert("Logged out successfully!");
        navigate('/FacultyLogin');
    };

    return (
        <div>
            <div className="alert alert-primary" role="alert">
                <center><b><h3>FILL YOUR LEAVE FORM</h3></b></center>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-4">
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Enter Your Name</label>
                                <input type="text" className="form-control" name="name" value={data.name} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Enter Your ID Number</label>
                                <input type="text" className="form-control" name="IdNo" value={data.IdNo} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Select Leave Type</label>
                                <select name="leaveType" value={data.leaveType} onChange={inputHandler} className="form-control">
                                    <option value="" disabled>Select a leave type</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Earned Leave">Earned Leave</option>
                                    <option value="Maternity Leave">Maternity Leave</option>
                                    <option value="Paternity Leave">Paternity Leave</option>
                                    <option value="Study Leave">Study Leave</option>
                                </select>
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Enter the Starting Date Of Your Leave</label>
                                <input type="date" className="form-control" name="Sdate" value={data.Sdate} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Enter the Ending Date Of Your Leave</label>
                                <input type="date" className="form-control" name="Edate" value={data.Edate} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Today's Date</label>
                                <input type="date" className="form-control" name="Tdate" value={data.Tdate} onChange={inputHandler} />
                            </div>
                            {/* Reason and File Upload in the Same Row */}
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Reason For Your Leave</label>
                                <textarea name="reasonforleave" value={data.reasonforleave} onChange={inputHandler} className="form-control"></textarea>
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label className="form-label">Upload Supporting Document</label>
                                <input type="file" className="form-control" name="file" onChange={fileHandler} />
                            </div>
                        </div>

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

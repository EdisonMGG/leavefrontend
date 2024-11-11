import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const SearchLeaveStud = () => {
    const [data, setData] = useState({ rollno: "", batch: "" });
    const [searchData, setSearchData] = useState({ Sdate: "", Edate: "" });
    const [semester, setSemester] = useState("");
    const [result, setResult] = useState([]);
    const [deletedLeaves, setDeletedLeaves] = useState([]);

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const searchInputHandler = (event) => {
        setSearchData({ ...searchData, [event.target.name]: event.target.value });
    };

    const searchByRollNo = () => {
        if (!data.rollno) {
            alert("Please enter Roll No to search.");
            return;
        }
        
        axios.post("http://localhost:8080/searchleavestud", data)
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const searchByDateRange = () => {
        if (!searchData.Sdate || !searchData.Edate) {
            alert("Please enter both start and end dates to search.");
            return;
        }

        axios.post("http://localhost:8080/searchleaves", searchData)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setResult(response.data);
                } else {
                    alert("No results found for the selected date range.");
                    setResult([]);
                }
            })
            .catch(error => {
                console.error("Error in searching leaves:", error);
            });
    };

    const DeleteLeave = (id) => {
        let input = { "_id": id };
        const leaveToDelete = result.find((leave) => leave._id === id);
        axios.post("http://localhost:8080/deletestudent", input)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully deleted");

                    setResult(result.filter((leave) => leave._id !== id));
                    setDeletedLeaves([...deletedLeaves, leaveToDelete]);

                    axios.post("http://localhost:8080/savedeletedleave", leaveToDelete)
                        .then((saveResponse) => {
                            console.log("Deleted leave saved:", saveResponse.data);
                        })
                        .catch((saveError) => {
                            console.error("Error saving deleted leave:", saveError);
                        });
                } else {
                    alert("Error in deletion");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                {/* Common Semester Selection */}
                <div className="row mt-4">
                    <div className="col col-12">
                        <h4>Select Semester (applies to all searches)</h4>
                        <div className="col col-6">
                            <label htmlFor="semester" className="form-label">Select Semester</label>
                            <select name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="form-select">
                                <option value="">Select Semester</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                                <option value="S3">S3</option>
                                <option value="S4">S4</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Search by Roll Number */}
                <div className="row mt-4">
                    <div className="col col-12">
                        <h4>Search Leave by Roll Number</h4>
                        <div className="row g-4">
                            <div className="col col-6">
                                <label htmlFor="rollno" className="form-label">Enter the Roll No</label>
                                <input type="text" name="rollno" value={data.rollno} onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="col col-6">
                                <label htmlFor="batch" className="form-label">Select Batch</label>
                                <select name="batch" value={data.batch} onChange={inputHandler} className="form-select">
                                    <option value="">Select Batch</option>
                                    <option value="A">Batch A</option>
                                    <option value="B">Batch B</option>
                                </select>
                            </div>
                            <div className="col col-12 mt-3">
                                <button className="btn btn-primary" onClick={searchByRollNo}>Search by Roll No</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search by Date Range */}
                <div className="row mt-4">
                    <div className="col col-12">
                        <h4>Search Leave by Date Range</h4>
                        <div className="row g-4">
                            <div className="col col-12 col-sm-6">
                                <label htmlFor="Sdate" className="form-label">Starting Date</label>
                                <input type="date" name="Sdate" value={searchData.Sdate} onChange={searchInputHandler} className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-6">
                                <label htmlFor="Edate" className="form-label">Ending Date</label>
                                <input type="date" name="Edate" value={searchData.Edate} onChange={searchInputHandler} className="form-control" />
                            </div>
                            <div className="col col-12 mt-3">
                                <button className="btn btn-secondary" onClick={searchByDateRange}>Search by Date Range</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display Search Results */}
                <div className="row mt-4">
                    <div className="col col-12">
                        <h3>Search Results</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Batch</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col">Rollno</th>
                                    <th scope="col">Leave Started From</th>
                                    <th scope="col">Leave Ended in</th>
                                    <th scope="col">Date of Submission</th>
                                    <th scope="col">Reason For Leave</th>
                                    <th scope="col">Label</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result.length === 0 ? (
                                        <tr>
                                            <td colSpan="10">No records found</td>
                                        </tr>
                                    ) : (
                                        result.map((value) => (
                                            <tr key={value._id}>
                                                <th scope="row">{value.name}</th>
                                                <td>{value.batch}</td>
                                                <td>{value.semester}</td>
                                                <td>{value.rollno}</td>
                                                <td>{value.Sdate}</td>
                                                <td>{value.Edate}</td>
                                                <td>{value.Tdate}</td>
                                                <td>{value.reasonforleave}</td>
                                                <td>
                                                    <input type="checkbox" checked={true} readOnly /> <span>Checked</span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => DeleteLeave(value._id)}>DELETE</button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchLeaveStud;

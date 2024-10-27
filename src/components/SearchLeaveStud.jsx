import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const SearchLeaveStud = () => {
    const [data, setData] = useState({ "rollno": "" });
    const [result, setResult] = useState([]);
    const [deletedLeaves, setDeletedLeaves] = useState([]);  // New state to track deleted leaves

    // Input value fetching
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    // Search button event
    const readValue = () => {
        console.log(data);
        axios.post("http://localhost:8080/searchleavestud", data).then(
            (response) => {
                setResult(response.data);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }

    const DeleteLeave = (id) => {
        let input = { "_id": id };
        const leaveToDelete = result.find((leave) => leave._id === id);  // Find the record to be deleted
        axios.post("http://localhost:8080/deletestudent", input).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Successfully deleted");
    
                    // Remove the deleted item from result and add it to deletedLeaves
                    setResult(result.filter((leave) => leave._id !== id));
                    setDeletedLeaves([...deletedLeaves, leaveToDelete]);
    
                    // Send the deleted leave data to the backend to save it
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
            }
        ).catch((error) => {
            console.log(error);
        });
    };
    

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-4">
                            <div className="col col-12">
                                <label htmlFor="" className="form-label">Enter the Roll No </label>
                                <input type="text" name="rollno" value={data.rollno} onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="col col-12">
                                <button className="btn btn-success" onClick={readValue}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display search results */}
                <div className="row mt-4">
                    <div className="col col-12">
                        <h3>Search Results</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Batch</th>
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
                                            <td colSpan="9">No records found</td>
                                        </tr>
                                    ) : (
                                        result.map((value, index) => {
                                            return (
                                                <tr key={value._id}>
                                                    <th scope="row">{value.name}</th>
                                                    <td>{value.batch}</td>
                                                    <td>{value.rollno}</td>
                                                    <td>{value.Sdate}</td>
                                                    <td>{value.Edate}</td>
                                                    <td>{value.Tdate}</td>
                                                    <td>{value.reasonforleave}</td>
                                                    <td>{value.Label}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => DeleteLeave(value._id)}>DELETE</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchLeaveStud;

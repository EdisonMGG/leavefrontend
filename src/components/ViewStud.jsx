import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Viewstud = () => {
    const [data, changeData] = useState([]);
    const [status, setStatus] = useState({}); // State to track the approval/rejection status

    const fetchData = () => {
        axios.get("http://localhost:8080/viewStud")
            .then((response) => {
                changeData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = (id, index) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [index]: 'approved', // Set the status as 'approved'
        }));
        
        axios.post("http://localhost:8080/approveLeave", { id }) // Send the correct leave request id
            .then(response => {
                console.log("Leave approved:", response.data);
            })
            .catch(error => {
                console.error("Error approving leave:", error);
            });
    };
    
    const handleReject = (id, index) => {
        setStatus((prevStatus) => ({
            ...prevStatus,
            [index]: 'rejected', // Set the status as 'rejected'
        }));
        
        axios.post("http://localhost:8080/rejectLeave", { id }) // Send the correct leave request id
            .then(response => {
                console.log("Leave rejected:", response.data);
            })
            .catch(error => {
                console.error("Error rejecting leave:", error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Batch</th>
                                    <th scope="col">Roll No</th>
                                    <th scope="col">Leave Started From</th>
                                    <th scope="col">Leave Ended In</th>
                                    <th scope="col">Date of Submission</th>
                                    <th scope="col">Reason For Leave</th>
                                    <th scope="col">File</th>
                                    <th scope="col">Status</th> {/* New Status column */}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{value.name}</th>
                                        <td>{value.batch}</td>
                                        <td>{value.rollno}</td>
                                        <td>{value.Sdate}</td>
                                        <td>{value.Edate}</td>
                                        <td>{value.Tdate}</td>
                                        <td>{value.reasonforleave}</td>
                                        <td>
                                            {value.filepath ? (
                                                <a href={`http://localhost:8080/${value.filepath.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                                                    View File
                                                </a>
                                            ) : (
                                                <span>No File</span>
                                            )}
                                        </td>
                                        <td>
                                            {/* Approve and Reject buttons */}
                                            <button
                                                className={`btn ${status[index] === 'approved' || value.status === 'approved' ? 'btn-success' : 'btn-outline-success'}`}
                                                onClick={() => handleApprove(value._id, index)}
                                                disabled={status[index] === 'approved' || value.status === 'approved'}
                                            >
                                                {status[index] === 'approved' || value.status === 'approved' ? 'Approved' : 'Approve'}
                                            </button>
                                            <button
                                                className={`btn ${status[index] === 'rejected' || value.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                                                onClick={() => handleReject(value._id, index)}
                                                disabled={status[index] === 'rejected' || value.status === 'rejected'}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                {status[index] === 'rejected' || value.status === 'rejected' ? 'Rejected' : 'Reject'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewstud;

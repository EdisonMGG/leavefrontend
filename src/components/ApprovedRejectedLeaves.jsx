import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const ApprovedRejectedLeaves = () => {
    const [approvedLeaves, setApprovedLeaves] = useState([]);
    const [rejectedLeaves, setRejectedLeaves] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/viewStud")
            .then((response) => {
                const data = response.data;
                setApprovedLeaves(data.filter(leave => leave.status === 'approved'));
                setRejectedLeaves(data.filter(leave => leave.status === 'rejected'));
            })
            .catch((error) => {
                console.error("Error fetching leave data:", error);
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Approved Leaves</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Roll No</th>
                            <th>Leave Start</th>
                            <th>Leave End</th>
                            <th>Submission Date</th>
                            <th>Reason</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedLeaves.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.name}</td>
                                <td>{leave.batch}</td>
                                <td>{leave.rollno}</td>
                                <td>{leave.Sdate}</td>
                                <td>{leave.Edate}</td>
                                <td>{leave.Tdate}</td>
                                <td>{leave.reasonforleave}</td>
                                <td>
                                    {leave.filepath ? (
                                        <a href={`http://localhost:8080/${leave.filepath.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                                            View File
                                        </a>
                                    ) : (
                                        <span>No File</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Rejected Leaves</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Roll No</th>
                            <th>Leave Start</th>
                            <th>Leave End</th>
                            <th>Submission Date</th>
                            <th>Reason</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rejectedLeaves.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.name}</td>
                                <td>{leave.batch}</td>
                                <td>{leave.rollno}</td>
                                <td>{leave.Sdate}</td>
                                <td>{leave.Edate}</td>
                                <td>{leave.Tdate}</td>
                                <td>{leave.reasonforleave}</td>
                                <td>
                                    {leave.filepath ? (
                                        <a href={`http://localhost:8080/${leave.filepath.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">
                                            View File
                                        </a>
                                    ) : (
                                        <span>No File</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedRejectedLeaves;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To extract rollno from the URL

const RejectedLeaves = () => {
    const [rejectedLeaves, setRejectedLeaves] = useState([]);
    const { rollno } = useParams(); // Extract rollno from the route

    useEffect(() => {
        // Fetch rejected leaves for the specific student from the backend
        axios.get(`http://localhost:8080/getrejectedleaves/${rollno}`)  // Pass rollno to the backend
            .then(response => {
                setRejectedLeaves(response.data);  // Assuming response.data contains the array of rejected leaves
            })
            .catch(error => {
                console.error('Error fetching rejected leaves:', error);
            });
    }, [rollno]);  // Re-run the effect whenever rollno changes

    return (
        <div className="container">
            <div style={{
                backgroundColor: '#007BFF', // Bootstrap primary color
                borderRadius: '10px',        // Rounded corners
                padding: '10px',             // Spacing inside the box
                color: '#ffffff',            // Text color
                textAlign: 'center',         // Center text
                marginBottom: '20px'         // Space below the box
            }}>
                <h3>Rejected Leave Requests</h3>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Roll No</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Submission Date</th>
                            <th>Reason</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {rejectedLeaves.length > 0 ? (
                            rejectedLeaves.map((leave, index) => (
                                <tr key={index}>
                                    <td>{leave.name}</td>
                                    <td>{leave.batch}</td>
                                    <td>{leave.rollno}</td>
                                    <td>{leave.Sdate}</td>
                                    <td>{leave.Edate}</td>
                                    <td>{leave.Tdate}</td>
                                    <td>{leave.reasonforleave}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No rejected leave requests found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RejectedLeaves;

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ApprovedStud = () => {
    const [rejectedLeaves, setRejectedLeaves] = useState([]);
    const student_rollnum = sessionStorage.getItem('student_rollnum'); // Get roll number from session storage

    useEffect(() => {
        if (student_rollnum) {
            // Fetch rejected leaves for the specific student from the backend
            console.log(student_rollnum);
            axios.get(`http://localhost:8080/getapprovedleaves/${student_rollnum}`)  // Pass userid in the URL
                .then(response => {
                    setRejectedLeaves(response.data);  // Assuming response.data contains the array of rejected leaves
                })
                .catch(error => {
                    console.error('Error fetching rejected leaves:', error);
                });
        } else {
            console.error('Roll number not found in session storage.');
        }
    }, [student_rollnum]);  // Re-run the effect whenever userid changes

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
                <h3>Approved Leave Requests</h3>
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
                            <th>Reason for Leave</th>
                            <th>Reason</th> {/* New column */}
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
                                    <td>meet HOD</td> {/* Fixed text */}
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

export default ApprovedStud
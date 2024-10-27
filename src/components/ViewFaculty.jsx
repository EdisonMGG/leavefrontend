import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ViewFaculty = () => {
    const [data, changeData] = useState([]);

    // This state will hold the status for each leave request (Approved/Rejected/None)
    const [statuses, setStatuses] = useState({});

    const fetchData = () => {
        axios.get("http://localhost:8080/viewFaculty")
            .then((response) => {
                changeData(response.data);
                // Initialize statuses to "None" for each request
                const initialStatuses = response.data.reduce((acc, value, index) => {
                    acc[index] = 'None';
                    return acc;
                }, {});
                setStatuses(initialStatuses);
            })
            .catch((error) => {
                console.error("Error fetching faculty data:", error);
            });
    };

    useEffect(() => { fetchData(); }, []);

    // Function to handle approval and rejection
    const handleStatusChange = (index, status) => {
        setStatuses((prevStatuses) => ({
            ...prevStatuses,
            [index]: status,
        }));
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
                                    <th scope="col">ID No</th>
                                    <th scope="col">Leave Started From</th>
                                    <th scope="col">Leave Ended In</th>
                                    <th scope="col">Date of Submission</th>
                                    <th scope="col">Reason For Leave</th>
                                    <th scope="col">File</th>
                                    <th scope="col">Status</th> {/* New column for status */}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{value.name}</th>
                                        <td>{value.IdNo}</td>
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
                                            <button
                                                onClick={() => handleStatusChange(index, 'Approved')}
                                                style={{
                                                    backgroundColor: statuses[index] === 'Approved' ? 'green' : 'white',
                                                    color: statuses[index] === 'Approved' ? 'white' : 'black',
                                                }}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(index, 'Rejected')}
                                                style={{
                                                    backgroundColor: statuses[index] === 'Rejected' ? 'red' : 'white',
                                                    color: statuses[index] === 'Rejected' ? 'white' : 'black',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Reject
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

export default ViewFaculty;

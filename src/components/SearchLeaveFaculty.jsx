import axios from 'axios'
import React, { useState } from 'react'
import Navbar from './Navbar'

const SearchLeaveFaculty = () => {
    const [data, setData] = useState(
        {
            "IdNo": ""

        }
    )
    const [result, setresult] = useState(
        []
    )
    
    //input value fetching
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    // search button event
    const readValue = () => {
        console.log(data)
        axios.post("http://localhost:8080/searchleavefaculty", data).then(
            (response) => {

                setresult(response.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }
    //delete function
    const DeleteLeave = (id) => {
        let input = { "_id": id }
        axios.post("http://localhost:8080/deletefaculty", input).then(
            (response) => {
                console.log(response.data)
                if (response.data.status == "success") {
                    alert("successfully deleted")
                } else {
                    alert("error in deletion")
                }
            }
        ).catch().finally()
    }


    return (
        <div>

            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-4">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Enter the Faculty ID </label>
                                <input type="text" name="IdNo" value={data.IdNo} onChange={inputHandler} className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg col-xl-12 col-xxl-12">
                                <button className="btn btn-success" onClick={readValue}>search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <table class="table">
                            <thead>

                                <tr>
                                <th scope="col">Name</th>
                                    <th scope="col">ID No</th>
                                    <th scope="col">Leave Started From</th>
                                    <th scope="col">Leave Ended in</th>
                                    <th scope="col">Date of Submission</th>
                                    <th scope="col">Reason For Leave</th>
                                    <th scope="col">Label</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result.map(
                                        (value, index) => {
                                            return <tr>
                                                <th scope="row">{value.name}</th>
                                                <td>{value.IdNo}</td>
                                                <td>{value.Sdate}</td>
                                                <td>{value.Edate}</td>
                                                <td>{value.Tdate}</td>
                                                <td>{value.reasonforleave}</td>
                                                <td>{value.Label}</td>
                                                <td><button className="btn btn-danger" onClick={() => { DeleteLeave(value._id) }}>DELETE</button></td>
                                            </tr>
                                        }


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

export default SearchLeaveFaculty
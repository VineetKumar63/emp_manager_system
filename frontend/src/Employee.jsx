import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  const [data, setData] = useState([])

  useEffect (() =>{
    axios.get('http://localhost:6060/getEmployee')
    .then(res =>{
      if (res.data.Status === "Success"){
        // console.log(res.data.Result)
        setData(res.data.Result);
      }
      //  else {
      //   alert("Error")

      // }
    })
    .catch(err => console.log(err));
  },[])

  const handleDelete = (id) => {
    axios.delete('http://localhost:6060/delete/'+id)
    .then(res =>{
      if (res.data.Status === "Success"){
        window.location.reload(true);
      } else {
        alert("Error")

      }
    })
    .catch(err => console.log(err));
  }
  
  return (
    <div className='px-5 py-3'>
    <div className='d-flex justify-content-center'>
      <h3>Employee List</h3>
    </div>
    <Link to="/create" className='p-2  btn btn-success border shodow'>Add Employee</Link>
    <div>
    <Link to="/Dashboard" className="btn btn-danger border shodow ">
            <i className="fs-4 bi-house-door text-white"></i> <span className="d-none d-sm-inline text-white">Dashboard</span></Link>
    </div>
    <div className='mt-3'>
    <table className='table'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>          
          <th>Salary</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee,index) => {
          return <tr key={index}>
            <td>{<img src={"http://localhost:6060/images/" + employee.image} alt="" className='empImg'/>}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.salary}</td>
            <td>{employee.address}</td>
            <td>
              <Link to={'/editEmployee/'+employee.id} className='btn btn-info btn-sm'>Edit</Link>
              <button onClick={e => handleDelete(employee.id)} className='btn btn-danger btn-sm'>Delete</button>
            </td>
          </tr>
        })}
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default Employee
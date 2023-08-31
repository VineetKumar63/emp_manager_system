import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
   
    const [adminCount, setAdminCount] = useState()
    const [employeeCount, setEmployeeCount] = useState()
    const [salaryCount, setSalaryCount] = useState()


    useEffect (() =>{


      axios.get('http://localhost:6060/adminCount')
      .then (res => {
        setAdminCount(res.data[0].admin)
        console.log(res);
      })
      .catch (err => console.log(err));

      axios.get('http://localhost:6060/employeeCount')
      .then (res => {
        setEmployeeCount(res.data[0].employee)
        console.log(res);
      })
      .catch (err => console.log(err));

      axios.get('http://localhost:6060/salaryCount')
      .then (res => {
        setSalaryCount(res.data[0].total_salary)
        console.log(res);
      })
      .catch (err => console.log(err));

  }, [])
  return (
    <div>
     <div>
        <Link to="/Dashboard" className="btn btn-danger border shodow ">
            <i className="fs-4 bi-house-door text-white"></i> <span className="d-none d-sm-inline text-white">Dashboard</span></Link>  
        </div>
      <div className='p-3 d-flex justify-content-around mt-3' >
        <div className='px-3 pt-2 p-3 border shadow-sm w-25' >
          <div className='text-center pb-1'>
            <h4>Admin</h4>
            <hr />
          </div>
          <div className=''>
            <h5>Total : {adminCount }</h5>
          </div>
        </div>

        <div className='px-3 pt-2 p-3 border shadow-sm w-25' >
          <div className='text-center pb-1'>
            <h4>Total Employees</h4>
            <hr />
          </div>
          <div className=''>
            <h5>Total : {employeeCount}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 p-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Total salary</h4>
            <hr />
          </div>
          <div className=''>
            <h5>Total : {salaryCount}</h5>
          </div>
        </div>

      </div>
      {/* List of admins */}
      <div className='mt-4 px-5 pt-3'>
      <h3>List Of Admins</h3>
      <table className='table'>
      <thead>
         <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
      </thead>
        <tbody>
         <tr>
           <td>Admin</td>
           <td>Admin</td>
         </tr>
        </tbody>
      </table>

      </div>

    </div>
  )
}

export default Home
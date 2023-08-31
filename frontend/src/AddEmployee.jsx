import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [data,setData] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    image:'',
  })

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("salary",data.salary);
    formData.append("address",data.address);
    formData.append("image",data.image);
    axios.post('http://localhost:6060/create',formData)
    .then(res => {
      navigate('/employee')
    })
    .catch(err => console.log(err));
  }
  return (
    <div className='d-flex flex-column align-items-center pt-4 border shadow' >
    <h2>Add Employee</h2>
    <form className='row g-3 w-50' onSubmit={handleSubmit}>

    <div className=' col-12'>
        <label htmlFor="inputName" className='form-lable'>Name</label>
        <input type="text" className='form-control' id='inputName' placeholder='Enter Employee name' autoComplete='off' onChange={e=> setData({...data,name: e.target.value})} />
      </div>

      <div className=' col-12'>
        <label htmlFor="inputEmail04" className='form-lable'>Email ID</label>
        <input type="email" className='form-control' id='inputEmail04' placeholder='Enter Employee email' autoComplete='off' onChange={e=> setData({...data,email: e.target.value})} />
      </div>

      <div className=' col-12'>
        <label htmlFor="inputPassword4" className='form-lable'>Password</label>
        <input type="password" className='form-control' id='inputPassword4' placeholder='Enter password' autoComplete='off' onChange={e=> setData({...data,password: e.target.value})} />
      </div>

      <div className=' col-12'>
        <label htmlFor="inputSalary" className='form-lable'>Salary</label>
        <input type="text" className='form-control' id='inputSalary' placeholder='Enter Employee Salary' autoComplete='off' onChange={e=> setData({...data,salary: e.target.value})} />
      </div>

      <div className=' col-12'>
        <label htmlFor="inputAddress" className='form-lable'>Address</label>
        <input type="text" className='form-control' id='inputAddress'  placeholder='Enter Address' autoComplete='off' onChange={e=> setData({...data,address: e.target.value})} />
      </div>

      <div className=' col-12 web-3'>
        <label htmlFor="inputGroupFile01" className='form-lable'>Select Image</label>
        <input type="file" className='form-control' id='inputGroupFile01' onChange={e=> setData({...data,image: e.target.files[0]})} />
      </div> 

      <div className='col-12'>
        <button type='submit' className='btn btn-primary'>Create</button>
      </div>

      <div>
        <Link to="/employee" className="btn btn-danger border shodow">
        <i className="bi bi-arrow-left-short text-white"></i>
        <span className="ms-1 d-none d-sm-inline text-white">Back</span>
        </Link>
        </div>

    </form>

    </div>
  )
}

export default AddEmployee
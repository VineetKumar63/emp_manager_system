import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
  const [data, setData] = useState({
    name: '',
    email: '',
    salary: '',
    address: '',
  })

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:6060/get/' + id)
      .then(res => {
        setData(prevData => ({
          ...prevData,
          name: res.data.Result[0].name,
          email: res.data.Result[0].email,
          salary: res.data.Result[0].salary,
          address: res.data.Result[0].address
        }));
      })
      .catch(err => console.log(err));
  }, [id]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:6060/update/'+ id, data)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/employee')
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div className='d-flex flex-column align-items-center pt-4 border shadow' >
      <h2>Update Employee</h2>
      <form className='row g-3 w-50' onSubmit={handleSubmit}>

        <div className=' col-12'>
          <label htmlFor="inputName" className='form-lable'>Name</label>
          <input type="text" className='form-control' id='inputName' placeholder='Enter Employee name' autoComplete='off' onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />
        </div>

        <div className=' col-12'>
          <label htmlFor="inputEmail04" className='form-lable'>Email ID</label>
          <input type="email" className='form-control' id='inputEmail04' placeholder='Enter Employee email' autoComplete='off' onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
        </div>

        <div className=' col-12'>
          <label htmlFor="inputSalary" className='form-lable'>Salary</label>
          <input type="text" className='form-control' id='inputSalary' placeholder='Enter Employee Salary' autoComplete='off' onChange={e => setData({ ...data, salary: e.target.value })} value={data.salary} />
        </div>

        <div className=' col-12'>
          <label htmlFor="inputAddress" className='form-lable'>Address</label>
          <input type="text" className='form-control' id='inputAddress' placeholder='Enter Address' autoComplete='off' onChange={e => setData({ ...data, address: e.target.value })} value={data.address} />
        </div>

        <div className='col-12'>
          <button type='submit' className='btn btn-warning'>update</button>
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

export default EditEmployee
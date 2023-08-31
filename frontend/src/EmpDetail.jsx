import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import { useNavigate, useParams } from 'react-router-dom'
import './index.css'

function EmpDetail () {
    const {id} = useParams() ;
    const [employee ,setEmployee] = useState([])
    const navigate= useNavigate ()
    useEffect(()=> {
        axios.get('http://localhost:6060/get/'+id)
        .then(res => setEmployee( res.data.Result[0]))
        .catch(err => console.log(err))

        },[id]);

        const handleLogout = () => {
            axios.get('http://localhost:6060/logout')
            .then(res => {
                navigate('/start')
            }).catch(err => console.log(err));
        }

    return (
    <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={`http://localhost:6060/images/`+employee.image} alt='' className='empImg2'/>
            <div className='d-flex align-itmes-center flex-column mt-5'>
            <h3>Name: {employee.name}</h3>
            <h3>Email: {employee.email}</h3>
            <h3>Salary: {employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'> Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
            </div>
        </div>
    )
 }  
  export default EmpDetail

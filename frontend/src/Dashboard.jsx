/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link, useNavigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default  function Dashboard() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect (() => {
        axios.get('http://localhost:6060/dashboard')
        .then (res => {
            if (res.data.Status === "Success") {
                    if (res.data.role === "admin")
                    {navigate('/')}
                    else{
                        const id = res.data.id ;
                        navigate('/empDetail/'+id)
                    }
            
            } else {
                navigate('/start')
            }
        })
    },[])

    ////logout
    const handleLogout = () => {
		axios.get('http://localhost:6060/logout')
		.then(res => {
			navigate('/start')
		}).catch(err => console.log(err));
	}

  return (
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
                </a>
               
<ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
    <li>
        <Link to="/" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-speedometer2 text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Dashboard</span>
        </Link>
    </li>

    <li class="nav-item">
        <Link to="/home" class="nav-link align-middle px-0">
            <i class="fs-4 bi-house text-white "></i> <span class="ms-1 d-none d-sm-inline text-white ">Home</span>
        </Link>
    </li>
    <li>
        <Link to="/employee" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-people text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Manage Employee</span>
        </Link>
    </li>
    <li>
        <Link to="/profile" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-person text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Profile</span>
        </Link>
    </li>
    <li onClick={handleLogout} >
        <Link to="/start" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-power text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Logout</span>
        </Link>
    </li>
</ul>


            
            </div>
        </div>
        <div class="col p-0 m-0">
        
        <div className='p-2 d-flex justify-content-center shadow'>
            <h4>Employee Management System</h4>
        </div>
            <Outlet/>
        </div>
    </div>
</div>
  )
}


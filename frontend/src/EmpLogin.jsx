import React, { useState } from "react";
import './index.css'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
function EmpLogin() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:6060/empLogin', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    const id = res.data.id; 
                    navigate('/empdetail/'+id);

                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => { console.log(err) })
            ;
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 logInPage" >
            <div className=' p-3 rounded w-25 border logInForm '>
                <div className="text-danger">
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter email" name='email' onChange={e => setValues({ ...values, email: e.target.value })} className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>password</strong></label>
                        <input type="password" placeholder="Enter password" name='password' onChange={e => setValues({ ...values, password: e.target.value })} className="form-control rounded-0" />
                    </div>

                    <button type="submit" className='btn btn-success w-100 rounded-0' >Log In</button>
                    <p>You are agree to our terms and policies</p>

                    <Link to="/start" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-power text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">HOME START</span></Link>
                </form>

            </div>

        </div>
    )
}

export default EmpLogin;
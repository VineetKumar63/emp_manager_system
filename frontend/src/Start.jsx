import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start() {
    const navigate = useNavigate ()

    return ( 
    <div className="d-flex justify-content-center align-items-center vh-100 logInPage text-center" >
        <div className=' p-3 rounded w-25 border logInForm '>
            <h2>Login as</h2>
            <div className='d-flex justify-content-between mt-3'>
                <button className='btn btn-primary btn-lg' onClick={e => navigate('/empLogin')}><strong>Employee</strong></button>
                <button className='btn btn-success btn-lg' onClick={e => navigate('/login')  }><strong>Admin</strong></button>
            </div>
        </div>

    </div>
    )
}

export default Start
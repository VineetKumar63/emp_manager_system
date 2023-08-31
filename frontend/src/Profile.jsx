import React from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div>
    <div>Profile </div>
    <div>
          <Link to="/Dashboard" className="btn btn-danger border shodow ">
            <i className="fs-4 bi-house-door text-white"></i> <span className="d-none d-sm-inline text-white">Dashboard</span></Link>
    </div>
    </div>
  )
}

export default Profile
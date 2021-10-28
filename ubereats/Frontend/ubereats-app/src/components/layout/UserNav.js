import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
const UserNav = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/User_Profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item" >
            <Link to="/Profile" className="nav-link">Edit Profile</Link>
          </li>
          <li className="nav-item" >
            <Link to="/Prev_Orders" className="nav-link">Previous Orders</Link>
          </li>
          <li className="nav-item" >
            <Link to="/UserFav" className="nav-link">Favourite</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="fas fa-user" />{' '}
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
          
        </ul>
        </nav>
    )
}



export default UserNav

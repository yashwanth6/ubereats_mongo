import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
const RestNav = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/Rest_Dash" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item" >
            <Link to="/User_Orders" className="nav-link">Orders</Link>
          </li>
          <li className="nav-item" >
            <Link to="/Completed_Orders" className="nav-link">Completed</Link>
          </li>
          <li className="nav-item" >
            <Link to="/InKitchen_Orders" className="nav-link">In-Kitchen</Link>
          </li>
          <li className="nav-item" >
            <Link to="/Cancelled_Orders" className="nav-link">Cancelled Orders</Link>
          </li>
          
          <li className="nav-item" >
          <Link to="/Rest_additems" className="nav-link">
              Add Items
            </Link>
          </li>
        </ul>
        </nav>
    )
}


export default RestNav

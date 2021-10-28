


import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul className="navbar-nav">
      
      <li className="nav-item">
        <a onClick={logout} href="#!">
        <Link to ="/" className="nav-link">Logout</Link>
        </a>
      </li>
    </ul>
    </nav>
  );

  const guestLinks = (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul className="navbar-nav">
      <li className="nav-item">
      <Link to ="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
      <Link to ="/login" className="nav-link">Login</Link>
      </li>
      <li className="nav-item">
      <Link to ="/rest_register" className="nav-link">Restaurant Register</Link>
      </li>
      <li className="nav-item">
      <Link to ="/rest_login" className="nav-link">Restaurant Login</Link>
      </li>
    </ul>
    </nav>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> UberEats
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

import React from 'react';
import { useState } from "react"
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { login, register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { setAlert } from "../../actions/alert";
import { rest_login } from "../../actions/auth";
import Rest_Dash from '../dashboard/Rest_Dash';
import User_Orders from '../dashboard/User_Orders';


export const Rest_Login = ({rest_login,  isAuthenticated}) => {

    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
   
    const {email,password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
        rest_login({email,password});
    };

    if (isAuthenticated) {
        return <Redirect to="/Rest_Dash" />;
      }

    return (

        <div>
            
            <div className="main" >
    
        <div className="container" >
        <div className="signup-content">

            <form className="signup-form" onSubmit={e => onSubmit(e)}>
            <h2 className="form-title">Register Here!!</h2>
            
           
            <div className="form-group">
            <label htmlFor="email"><b>Email</b></label>
              <input  className='form-control' 
                        type="email" 
                        placeholder="user@gmail.com" 
                        value={email}
                        name="email"
                        onChange={e => onChange(e)}
                       // required
               />   
            </div>

            <div className="form-group">
            <label htmlFor="password"><b>Password</b></label>
            <input  className='form-control' 
                        type="password" 
                        placeholder="min8chars@6" 
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        //required 
            />   
            </div>
              
            <div className="form-group" >
                    <input type="submit"  className="form-submit"  />
            </div>
                
            </form>
            <p>
                New User!<Link to = '/rest_register'>Sign up</Link>
            </p>
        </div>
    </div>
</div>
        
</div>
    )
}

Rest_Login.propTypes = {
    rest_login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
export default connect(mapStateToProps, {rest_login})(Rest_Login);

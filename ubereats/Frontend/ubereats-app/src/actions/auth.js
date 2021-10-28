import axios from 'axios';
import { setAlert } from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () =>async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};


export const register = formData => async dispatch => {
    try {
        
      const res = await axios.post('/api/users', formData);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: REGISTER_FAIL
      });
    }
    finally{
        console.log(formData);
    }
  };


export const login = ({ email, password}) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password});
    localStorage.setItem('email', email);
    try{
        const res = await axios.post('/api/auth',body,config);
        if(res.data !== "failure"){{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            //dispatch(loadUser());
            
         }}
         else{
            dispatch({
                type: LOGIN_FAIL
            })
            alert("Invalid credentials!");
         }
        
        
    }catch(err){
        const errors = err.response.data.errors;
        console.log(errors);
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg)));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
    };


    export const rest_register = ({name, email, password,location,type}) => async dispatch =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({name, email, password, location, type});
        console.log(body);
        try{
            const res = await axios.post('/api/restaurant',body,config);
            if(res.data==='failure'){
                alert("user already existed");
            }
            else{
                alert("Restaurant added")
            }
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
    
            //dispatch(loadUser());
        }catch(err){
            const errors = err.response.data.errors;
            console.log(errors);
            if(errors){
                errors.forEach(err => dispatch(setAlert(err.msg)));
            }
            dispatch({
                type: REGISTER_FAIL
            })
        }
        };


        export const rest_login = ({ email, password}) => async dispatch =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ email, password});
            localStorage.setItem('email', email);
            try{
                const res = await axios.post('/api/restaurant/login',body,config);
                if(res.data !== "failure"){{
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data
                    });
                    dispatch(loadUser());
                    
                 }}
                 else{
                    dispatch({
                        type: LOGIN_FAIL
                    })
                    alert("Invalid credentials!");
                 }
            }catch(err){
                const errors = err.response.data.errors;
                console.log(errors);
                if(errors){
                    errors.forEach(err => dispatch(setAlert(err.msg)));
                }
                dispatch({
                    type: LOGIN_FAIL
                })
            }
            };


export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}
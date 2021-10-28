import axios from "axios";
import { setAlert } from "./alert";

import{
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

export const getCurrentProfile=()=> async dispatch=>{
    try {
        var email = localStorage.getItem('email');
        console.log(email);
        //const body = JSON.stringify({ email });
        //console.log(body);
        const res=await axios.post('api/profile/me',{email:email})
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            //payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};
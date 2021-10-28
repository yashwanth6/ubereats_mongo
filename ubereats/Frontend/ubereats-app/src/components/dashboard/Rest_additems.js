import { Fragment } from "react"
import React from 'react'
import {connect} from 'react-redux';
import { useState } from "react"
import axios from 'axios';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types';
import { register } from "../../actions/auth";
import RestNav from "../layout/RestNav";
import { Link } from 'react-router-dom';
export const Rest_additems= ({setAlert}) => {
    var e=localStorage.getItem('email');
    const [formData, setFormData] = useState({
        email:e,
        item_name: '',
        foodtype: '',
        price:'',
    });
   
    const {email,item_name,foodtype,price} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
       
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({email,item_name,foodtype,price});
            const req = await axios.post('/api/restaurant/add_items',body,config);
            if(req.data === 'success'){
                alert("Item added Successfully!");
            }
            console.log(req.data); 
        
    }

    return (
        <div>
            <br></br>
            <RestNav/>
            <div className="main" >
    
        <div className="container" >
        <div className="signup-content">

            <form className="signup-form" onSubmit={e => onSubmit(e)}>
            <h2 className="form-title">Register Here!!</h2>
                
            <div className="form-group">
            <label htmlFor="item_name"><b>Item</b></label>
            <input className='form-control' 
                    type="text" 
                    placeholder="Enter Item name"
                    name='item_name'
                    value={item_name}
                    onChange={e => onChange(e)}
                    required pattern="[A-Za-z ]{2,}"
                 />   
            </div>
           
            <div className="form-group">
            <label htmlFor="foodtype"><b>Food Type</b></label>
                        <div>
                       <select required
                       value={foodtype}
                       name='foodtype'
                       onChange={e => onChange(e)}>
                      <option value="">Enter</option>
                      <option value="veg">Veg</option>
                       <option value="nonveg">NonVeg</option>
                       
                     </select>
        </div>
         </div>

           

            <div className="form-group">
            <label htmlFor="price"><b>Price</b></label>
            <input  className='form-control' 
                        type="text" 
                        placeholder="Enter price" 
                        name="price"
                        value={price}
                        onChange={e => onChange(e)}
                        required 
            />   
            </div>

            
              
            <div className="form-group" >
           
                    <input type="submit"  className="form-submit"  />
                  
            </div>
                
            </form>
        </div>
    </div>
</div>
        
</div>
    )
}

Rest_additems.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, {setAlert})(Rest_additems);

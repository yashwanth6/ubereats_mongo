import { Fragment } from "react"
import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types';
import { register } from "../../actions/auth";
import RestNav from "../layout/RestNav";
import { Link } from 'react-router-dom';
export const EditOrders= ({setAlert}) => {
    var e=localStorage.getItem('edit');
    
    useEffect(() => {
        async function fetchData() {
          const req = await axios.post('/api/restaurant/getoneorder',{_id:e});
          //var string=JSON.stringify(req.data);
          var json =  req.data;
          console.log(json);
          //console.log(json[0].mobile);
          setFormData(json[0])
        }
  
        fetchData();
      }, [])
    const [formData, setFormData] = useState(
        {
        _id:e,
        item_name: '',
        foodtype: '',
        price:''
    });
   
    const {_id,item_name,foodtype,price} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});


    const onSubmit = async e => {
        e.preventDefault();
       
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify({_id,item_name,foodtype,price});
            console.log(body);
            
            
            const req = await axios.put('/api/restaurant/edit_orders',body,config);
            if(req.data === "success"){
                alert("Edited Successfully!");
            }
            else{
                alert("Operation Failed!");
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
            <label htmlFor="item_name"><b>item_name</b></label>
            <input className='form-control' 
                    type="text" 
                    placeholder="Enter item_name name"
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

EditOrders.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, {setAlert})(EditOrders);

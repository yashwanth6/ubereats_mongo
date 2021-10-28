import { Fragment } from "react"
import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types';
import { register } from "../../actions/auth";
import './Profile.css'
 import UserNav from "../layout/UserNav";


export const Profile= ({setAlert,auth:{user}}) => {
    var e=localStorage.getItem('email');
    
    useEffect(() => {
        async function fetchData() {
          const req = await axios.post('/api/profile/me',{email:e});
          //console.log(req.data);
          var string=JSON.stringify(req.data);
          var json =  JSON.parse(string);
          //console.log(json[0].uname);
          //console.log(json[0].mobile);
          setFormData(req.data)
        }
  
        fetchData();
      }, [])
    const [formData, setFormData] = useState(
        {
        email:e,
        name: '',
        password: '',
        confpassword:'',
        location: '',
        mobile: '',
        dateofbirth:'',
        nickname:'',
        
    });
   
    const {email,name,password,confpassword,location,mobile,nickname,dateofbirth} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});

    

    const onSubmit = async e => {
       
        e.preventDefault();
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({email,name,password,location,mobile,nickname,dateofbirth});
            console.log(body);
            const req = await axios.put('/api/restaurant/changeprofile',body,config);
      
            console.log(req.data); 
            if(req.data!=='failure'){
                alert("Data Updated successfully")
            }
        
    }

    return (
//className="signup-form" onSubmit={e => onSubmit(e)}

<body>
<br></br>
            <UserNav/>
<div class="col-xl-8 order-xl-1 main">
<br></br>
<div class="card bg-secondary shadow">
  <div class="card-header bg-white border-0">
    <div class="row align-items-center">
      <div class="col-8">
        <h3 class="mb-0">Edit details</h3>
      </div>
      
    </div>
  </div>
  <div class="card-body">
    <form className="signup-form" onSubmit={e => onSubmit(e)}>
      <h6 class="heading-small text-muted mb-4">User information</h6>
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="name"><b>Username</b></label>
             <input class="form-control form-control-alternative" 
             type="text" 
             placeholder="Enter Username"
             name='name'
             value={name}
             onChange={e => onChange(e)}
          required
       />  
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
            <label class="form-control-label" htmlFor="email"><b>Email</b></label>
           <input  class="form-control form-control-alternative" 
              type="email" 
              placeholder="user@gmail.com" 
              value={email}
              name="email"
              onChange={e => onChange(e)}
              required
     />   
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="location"><b>Location</b></label>
             
             <select class="form-control form-control-alternative" 
             value={location} 
             name='location'
             onChange={e => onChange(e)}>
            <option value="sanjose">San jose</option>
             <option value="milpitas">Milpitas</option>
             <option value="santaclara">Santa Clara</option>
           </select>
             
            </div>
          </div>
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="mobile"><b>Mobile</b></label>
    <input class="form-control form-control-alternative" 
              type="text" 
              placeholder="Enter mobile number" 
              value={mobile}
              name='mobile'
              onChange={e => onChange(e)}
              required
     />   
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4"/>

      <h6 class="heading-small text-muted mb-4">Contact information</h6>
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="nickname"><b>Nickname</b></label>
           <input  class="form-control form-control-alternative"  
              type="text" 
              placeholder="Enter nickname" 
              value={nickname}
              name='nickname'
              onChange={e => onChange(e)}
              //required
     />  
            </div>
          </div>
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="dateofbirth"><b>Date of Birth</b></label>
 
      <input class="form-control form-control-alternative"
             type="date" 
            // placeholder="Enter nickname" 
             value={dateofbirth}
             name='dateofbirth'
             onChange={e => onChange(e)}
             //required
    />   
            </div>
          </div>
          
        </div>
       

           
      </div>
      
      <div className="form-group" >
          <input type="submit"  className="form-submit"  />
  </div>
    </form>
  </div>
  </div>
  </div>
  </body>
    )
}

Profile.propTypes = {
    setAlert: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
};


const mapStateToProps = state =>({
    auth: state.auth,
});

export default connect(mapStateToProps, {setAlert})(Profile);

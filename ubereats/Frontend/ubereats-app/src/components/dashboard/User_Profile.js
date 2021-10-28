import React,{Fragment, useEffect,useState} from 'react'
import PropTypes, { array, func } from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCurrentProfile } from '../../actions/profile'
import Rest_landing from './Rest_landing'
import { Link } from 'react-router-dom';
import Profile from './Profile';
import UserNav from '../layout/UserNav'
const User_Profile = ({getCurrentProfile,isAuthenticated=true,auth:{user},profile:{profile,loading}})=> {
    useEffect(()=>{
        getCurrentProfile();
    },[]);
    const [people, setPeople] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const res = await axios.post('/api/profile/getprofile',{email:localStorage.getItem('email')});
        var dat=res.data;
        
      console.log(dat);
      setPeople(dat);
      }

      fetchData();
    }, [])


   
    return (
        
        <Fragment>

          <br></br>
            <UserNav/>

             <div>
            
            </div>
           
                
                <div class="container">
                    <h2>Profile Details</h2>
                        
        {people.map((book) => (
             
           <div>
               <p><b>Username:</b>&nbsp;{book.name}</p>
               <p><b>Email:</b>&nbsp;{book.email}</p>
               <p><b>Book:</b>&nbsp;{book.location}</p>
               <p><b>Date of Birth:</b>&nbsp;{book.dateofbirth}</p>
               <p><b>Mobile:</b>&nbsp;{book.mobile}</p>
               <p><b>Nickname:</b>&nbsp;{book.nickname}</p>
           </div>
        
    ))}

                </div> 
        </Fragment>
    )
}

User_Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile})(User_Profile);
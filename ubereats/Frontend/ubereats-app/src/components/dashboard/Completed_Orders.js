import React,{Fragment, useEffect,useState} from 'react'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCurrentProfile } from '../../actions/profile'
import Rest_landing from './Rest_landing'
import { Link } from 'react-router-dom';
import RestNav from '../layout/RestNav'
const User_Orders = ({getCurrentProfile,auth:{user},profile:{profile,loading}})=> {

   
    
    const [people, setPeople] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const req = await axios.post('/api/restaurant/getcompletedorders',{email:localStorage.getItem('email')});
      
        setPeople(req.data);
      }

      fetchData();
    }, [])
  

    let details = people.map(book => {
        
        return(
            <tr>
                <td>{book._id}</td>
                <td>{book.email}</td>
                <td>{book.items.map(tb => {return(
                     <tr>
                    <tr>ID: {tb.id}</tr>
                    <tr>Item name: {tb.item_name}</tr>
                    <tr>Item Type: {tb.foodtype}</tr>
                    <tr>Price: {tb.price}</tr>
                    </tr>)})}
                </td>
                <td>{book.foodstatus}
                
                
                </td>
            </tr>
        )
    })
   
    return (
       
        
        <Fragment>
            <br></br>
            <RestNav/>
             
            <h1 className="large text"></h1>
                
               
                <div class="container">
                    <h2>List of All Orders</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Items</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                               
                                
                            </tbody>
                        </table>
                </div> 
        </Fragment>
    )
}

User_Orders.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile})(User_Orders);

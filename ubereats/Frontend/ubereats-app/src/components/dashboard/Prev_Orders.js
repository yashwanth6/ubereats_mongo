import React,{Fragment, useEffect,useState} from 'react'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCurrentProfile } from '../../actions/profile'
import Rest_landing from './Rest_landing'
import { Link } from 'react-router-dom';
import UserNav from '../layout/UserNav'
const Prev_Orders = ({getCurrentProfile,auth:{user},profile:{profile,loading}})=> {
    useEffect(()=>{
        getCurrentProfile();
    },[]);
    const [people, setPeople] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const req = await axios.post('/api/restaurant/getorders',{email:localStorage.getItem('email')});
      
        setPeople(req.data);
      }

      fetchData();
    }, [])

    let details = people.map(book => {
        
        return(
            <tr>
                <td>{book.rest_name}</td>
                <td>{JSON.parse(book.items).map(tb => {return(
                     <tr>
                    <tr>ID: {tb.id}</tr>
                    <tr>Item name: {tb.item}</tr>
                    <tr>Item Type: {tb.foodtype}</tr>
                    <tr>Price: {tb.price}</tr>
                    <tr>Quantity: {tb.quantity}</tr>
                    </tr>)})}
                </td>
                <td>{book.foodstatus}</td>
                <td>{book.delivery}</td>
            </tr>
        )
    })

    return (
       
        
        <Fragment>
             <br></br>
            <UserNav/>
             <div>

            
          
          
            </div>
            <h1 className="large text"></h1>
               
               
                <div class="container">
                    <h2>Previous Orders</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Items</th>
                                    <th>Status</th>
                                    <th>Delivery type</th>
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

Prev_Orders.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile})(Prev_Orders);

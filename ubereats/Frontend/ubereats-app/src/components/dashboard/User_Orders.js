import React,{Fragment, useEffect,useState} from 'react'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCurrentProfile } from '../../actions/profile'
import Rest_landing from './Rest_landing'
import { Link } from 'react-router-dom';
import RestNav from '../layout/RestNav'
const User_Orders = ({getCurrentProfile,auth:{user},profile:{profile,loading}})=> {

    const [formData, setFormData] = useState({
        foodstatus:''
    });
   
    const {foodstatus} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});

    const sub = (e) => {
       console.log(e);
       const stat = axios.put('/api/restaurant/updatestatus',{status:e});
      if(stat.data!=='failure'){
          alert("status updated successfully");
      }
    }

    const sub1 = (e) => {
        console.log(e);
        const stat = axios.put('/api/restaurant/updatestatus1',{status:e});
       if(stat.data!=='failure'){
           alert("status updated successfully");
       }
     }

     const sub2 = (e) => {
        console.log(e);
        const stat = axios.put('/api/restaurant/updatestatus2',{status:e});
       if(stat.data!=='failure'){
           alert("status updated successfully");
       }
     }

     const sub3 = (e) => {
        console.log(e);
        const stat = axios.put('/api/restaurant/updatestatus3',{status:e});
       if(stat.data!=='failure'){
           alert("status updated successfully");
       }
     }
    
    const [people, setPeople] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const req = await axios.post('/api/restaurant/getrestorders',{email:localStorage.getItem('email')});
      console.log(req.data);
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
                    <tr>ID: {tb._id}</tr>
                    <tr>Item name: {tb.item_name}</tr>
                    <tr>Item Type: {tb.foodtype}</tr>
                    <tr>Price: {tb.price}</tr>
                    </tr>)})}
                    <tr>Instructions: {book.instructions}</tr>
                </td>
                <td>{book.foodstatus}</td>
                <td>
                    
                <Link to ="/Completed_Orders">
                <button onClick={(e)=> sub(book._id)}>
                                    Completed
                                </button>
                </Link>

                <Link to ="/Rest_Dash">
                <button onClick={(e)=> sub1(book._id)}>
                                    In-kitchen
                                </button>
                </Link>

                <Link to ="/Rest_Dash">
                <button onClick={(e)=> sub2(book._id)}>
                                    Delivered
                                </button>
                </Link>

                <Link to ="/Cancelled_Orders">
                <button onClick={(e)=> sub3(book._id)}>
                                    Cancel
                                </button>
                </Link>
                
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
                                    <th>User</th>
                                    <th>Items</th>
                                    <th>Delivery Type</th>
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

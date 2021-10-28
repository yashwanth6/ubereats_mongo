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
    
    const [people, setPeople] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const req = await axios.post('/api/restaurant/getrestorders',{email:localStorage.getItem('email')});
      
        setPeople(req.data);
      }

      fetchData();
    }, [])
  

    let details = people.map(book => {
        
        return(
            <tr>
                <td>{book.orderid}</td>
                <td>{book.email}</td>
                <td>{JSON.parse(book.items).map(tb => {return(
                     <tr>
                    <tr>ID: {tb.id}</tr>
                    <tr>Item name: {tb.item}</tr>
                    <tr>Item Type: {tb.foodtype}</tr>
                    <tr>Price: {tb.price}</tr>
                    </tr>)})}
                </td>
                <td>{book.delivery}</td>
                <td>
                    
                <Link to ="/Completed_Orders">
                <button onClick={(e)=> sub(book.orderid)}>
                                    Completed
                                </button>
                </Link>

                <Link to ="/Rest_Dash">
                <button onClick={(e)=> sub1(book.orderid)}>
                                    In-kitchen
                                </button>
                </Link>

                <Link to ="/Rest_Dash">
                <button onClick={(e)=> sub2(book.orderid)}>
                                    Delivered
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

import React,{Fragment, useEffect,useState} from 'react'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom';
import Rest_additems from './Rest_additems'
import RestNav from '../layout/RestNav'
const Rest_Dash = ({getCurrentProfile,auth:{user},profile:{profile,loading}})=> {
    useEffect(()=>{
        getCurrentProfile();
    },[]);
    const [people, setPeople] = useState([]);
    const email= localStorage.getItem('email');
    useEffect(() => {
      async function fetchData() {
        const req = await axios.post('/api/restaurant/get_items',{email:email});
      
        setPeople(req.data);
      }

      fetchData();
    }, [])

    let details = people.map(book => {
        return(
            <tr>
                <td>{book._id}</td>
                <td>{book.item_name}</td>
                <td>{book.foodtype}</td>
                <td>{book.price}</td>
                <td>
                    <Link to ="/EditOrders">
                    <button onClick={()=> localStorage.setItem('edit',book.id)}>Edit</button>
                    </Link>
                </td>
            </tr>
        )
    })

    return (
       
        
        <Fragment>
            <br></br>
            <RestNav/>
             <div>
            
            

          
            </div>
            <h1 className="large text"></h1>
               
                <div class="container">
                    <h2>List of All Items</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>price</th>
                                    <th>Edit</th>
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

Rest_Dash.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile})(Rest_Dash);

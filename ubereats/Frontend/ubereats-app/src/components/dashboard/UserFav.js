import React,{Fragment, useEffect,useState} from 'react'
import PropTypes, { func } from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCurrentProfile } from '../../actions/profile'
import Rest_landing from './Rest_landing'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'
import UserNav from '../layout/UserNav'
const UserFav = ()=> {
    
    const [countriesStore, setCountriesStore] = useState([]);
    const [countries, setCountries] = useState([]);
    const [searchString, setSearchString] = useState("");
   
    const hook = () => {
        axios.post('/api/restaurant/getfav',{email:localStorage.getItem('email')}).then(response => {
        console.log("promise fulfilled");
        setCountriesStore(response.data);
        setCountries(response.data);
      });
    };
  
    const filter = event => {
      setSearchString(event.target.value);
      let value = event.target.value;
      const filterCountries = countriesStore.filter(country => {
       return country.name.toLowerCase().includes(value);
       
    });

    setCountries(filterCountries);
  };

    

     
    useEffect(() => {
        hook();
        
      }, []);



    return (
       
        
        <Fragment>
            <br></br>
            <UserNav/>

            <div>
      
      
      <div >
     
      
      
      </div>
      <ul>
        {countries.map(country => (
          <li class="stunt" key={country.name.trim()}>
               <div class="row">
              <div class="col-lg-4">
            <div class="card yash">
  <img class="card-img-top" src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">{country.name}</h5>
    <p>{country.location}</p>
    <p>{country.delivery}</p>
    <Link to="/Rest_landing">
    <button class="btn btn-primary" onClick={()=> localStorage.setItem('rest_name',country.name)}>Order!</button>
    
    </Link>
  
  </div>
  </div>
</div>
</div>
              
              
              
              </li>
        ))}
      </ul>
      </div>


        










            
                
        </Fragment>
    )
}




export default UserFav;

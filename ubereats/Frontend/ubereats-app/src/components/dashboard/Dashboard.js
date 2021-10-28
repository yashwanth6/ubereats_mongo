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
const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading}})=> {
    useEffect(()=>{
        getCurrentProfile();
    },[]);
    const [countriesStore, setCountriesStore] = useState([]);
    const [countries, setCountries] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [settype, settypeString] = useState("");
    const [setdelivery, setdeliveryString] = useState("");
    const [afilter2, setAfilter2] = useState([]);
    
    
    const hook = () => {
        axios.post('/api/restaurant/rest_list',{email:localStorage.getItem('email')}).then(response => {
        console.log("promise fulfilled");
        console.log(response.data);
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

  const filter1 = event => {
    settypeString(event.target.value);
    let value = event.target.value;

    const filterCountries = countriesStore.filter(country => 
        (country.location == event.target.value)
    //     {
    //    if(country.location.toLowerCase().includes(value)){
    //  return country.location.toLowerCase().includes(value);
    //    }
    //    else{
    //     return country.delivery.toLowerCase().includes(value);
    //    }
     
  //}
  );
  setCountries(filterCountries);
};

    const filter2 = event => {
        //     setdeliveryString(event.target.value);
        //     let value = event.target.value;
        //     const filterCountries = countriesStore.filter(country => 
        //     (country.delivery == event.target.value))
        //  setCountries(filterCountries);
        localStorage.setItem('deliverytype', event.target.value)
        };

     const favorite = e =>{
       let dat = e;
       const body={favorite:dat,email:localStorage.getItem('email')};
       const request = axios.put("/api/restaurant/addfavorite",body);
       if(request.data !== "failure"){
         alert("Added to favourites");
       }
     }
    useEffect(() => {
        hook();
        setSearchString("");
        settypeString("");
        setdeliveryString("");
      }, []);



    return (
       
        
        <Fragment>
            <br></br>
            <UserNav/>

            <div>
      
      <div>
      <input value={searchString} onChange={filter} placeholder="Enter name"/>
      </div>
      {/* <div>
      <input value={settype} onChange={filter1} placeholder="Enter location"/>
      </div> */}
      {/* <div>
      <input value={setdelivery} onChange={filter2} placeholder="Type"/>
      </div> */}
      <div >
      <div onChange={filter2} required>
        <input type="radio" value="pickup" name="gender" checked/> Pick Up
        <input type="radio" value="delivery" name="gender" /> Delivery
      </div>
       <select onChange={filter1}>
                  
                  <option value="sanjose">San Jose</option>
                  <option value="sanfrancisco">San Francisco</option>
                  <option value="santaclara">Santa Clara</option>
        </select>
      
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
    <p>{country.type}</p>
    <Link to="/Rest_landing">
    <button class="btn btn-primary" onClick={()=> localStorage.setItem('rest_name',country.name)}>Order!</button>
    
    </Link>
    <button class="btn btn-primary" onClick={()=> favorite(country.name)}>Add Favorite</button>
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

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth: state.auth,
    profile: state,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);

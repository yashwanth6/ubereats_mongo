import React,{Fragment, useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard2 = () => {
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

  useEffect(() => {
    hook();
    setSearchString("");
    settypeString("");
    setdeliveryString("");
  }, []);

  return (
    <div>
      <p>find countries</p>
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
      <div onChange={filter2}>
        <input type="radio" value="pickup" name="gender" /> Pick Up
        <input type="radio" value="delivery" name="gender" /> Delivery
      </div>
       <select onChange={filter1}>
                  
                  <option value="sanjose">San Jose</option>
                  <option value="santaclara">Santa Clara</option>
                  <option value="milpitas">Milpitas</option>
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
    <p>{country.delivery}</p>
    <Link to="/Rest_landing">
    <button class="btn btn-primary" onClick={()=> localStorage.setItem('rest_name',country.name)}>Ckick here!</button>
    </Link>
  </div>
  </div>
</div>
</div>
              
              
              
              </li>
        ))}
      </ul>
      </div>
  );
}

export default Dashboard2;

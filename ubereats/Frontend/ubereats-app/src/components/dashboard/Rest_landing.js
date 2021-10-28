/*
import React,{Fragment, useEffect,useState} from 'react';
import axios from 'axios';
import Rest_land_comp from './Rest_land_comp';


function Rest_landing(a,b) {    
    console.log(a);
    console.log(b);
    var c = a;
    console.log(String(c));
    return (
        <div>
            <Rest_land_comp data={c}/>
                     
        </div>
    )
}

export default Rest_landing;
*/
/*
const Rest_landing = () => {
    const [peeps, setPeeps] = useState([]);
    console.log("abcd");  
    //var c=String("mr.biryani");
    async function getData() {
        const req = await axios.post('/api/restaurant/order_list',{name:"mr.biryani"});
        console.log(req);
        setPeeps(req);
      }
    useEffect(() => {getData();}, [])
    
    //console.log(a);
    //console.log(b);
    
    let details = peeps.map(book => {
        return(
            <tr>
                <td>{book.rest_name}</td>
                <td>{book.item}</td>
                
            </tr>
        )
    })
    return (
            <div>
                <p> a </p>
                {details}
            </div>
    )
}

export default Rest_landing;
*/


import React,{Fragment, useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom';
import Dashboard from './Dashboard';
import axios from 'axios'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap'
import { setAlert } from '../../actions/alert'
import Popup from './Popup';
import Cart from './Cart';
import "./Popup.css";
import UserNav from '../layout/UserNav';

const Rest_landing = (props)=> {
    
    const [people, setPeople] = useState([]);
    const [cart, setCart] = useState([]);
    const [alertt, setalert] = useState("");
    const [carttotal, setCarttotal] = useState(0);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [funct, setFunct] = useState("");
    const [status,setStatus] = useState(false);
    console.log(cart);
    useEffect(() => {
      async function fetchData() {
        
        const req = await axios.post('/api/restaurant/order_list',{rest_name:localStorage.getItem('rest_name')});
        if(req.data ==="failure"){
            return(
                <div>
                    <p>There are no items. Please add items</p>
                </div>
            )
        }
      
        setPeople(req.data);
      }

      fetchData();
    }, [])
    useEffect(()=>{
        total();
        setStatus(true);
    },[cart])
    useEffect(()=>{
        if(funct == "abc" && (JSON.stringify(cart) != "[]"))
        {
            
        axios.post('/api/restaurant/cart',{rest_name:
            localStorage.getItem('rest_name'),cart:cart,email:localStorage.getItem('email'),total:carttotal,
            delivery:localStorage.getItem('deliverytype')
        });
        }
        setFunct("deb");
    },[funct])
    const total = () => {
        let totalVal = 0;
        for(let i=0; i<cart.length;i++)
        {
            totalVal += cart[i].price * cart[i].quantity;
            totalVal = Math.round(totalVal * 100) / 100
        }
        setCarttotal(totalVal);
    }
    const addcart = (el) => {
        let addIt = true;
        for(let i = 0; i< cart.length;i++)
        {
            if(cart[i].id === el.id) addIt = false; 
        }
        if(addIt) {
            setCart([...cart,el]);
            setAlert("");
        }
        else setAlert(`${el.item} is already in your cart`);
    } 
    const removecart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id!=el.id);
        setCart(hardCopy);
    }
/////////////////////////////////////////////////////////////////////
    const handleQuantityIncrease = (book) => {

		book.quantity++;


	};

	const handleQuantityDecrease = (book) => {
      if(book.quantity >= 1 )
      {
		book.quantity--;
      }
	};
/////////////////////////////////////////////////////
    let details = people.map(book => {
        return(
            <tr>
                
                <td>{book.item}</td>
                <td>{book.foodtype}</td>
                <td>{book.price}</td>


                <div className='quantity'>
                                <button onClick={() => handleQuantityIncrease(book)}>    
                                <a href="#" class="btn btn-info btn-lg">
                                <span class="glyphicon glyphicon-plus"></span> +
                                </a>  
                                </button>
                                <span> {book.quantity} </span>
                                <button onClick={() => handleQuantityDecrease(book)}>
                                <a href="#" class="btn btn-info btn-lg">
                                <span class="glyphicon glyphicon-minus"></span> -
                                </a>
                                </button>
				</div>

                <td><button onClick={()=> addcart(book)}>Add to cart</button></td>
               

            </tr>
        )
    })

    let details1 = cart.map(book => {
        return(
           <tr>
               <br></br>
                <tr>Restaurant Name: &nbsp; {book.rest_name}</tr>
                <tr>Item:       &nbsp;     {book.item}</tr>
                <tr>Food Type:  &nbsp;     {book.foodtype}</tr>
                <tr>Quantity:  &nbsp;     {book.quantity}</tr>
                <tr>Price:    &nbsp;       {book.price}</tr>
                <hr></hr>
           </tr>
                
            
        )
    })
    let cartItems = cart.map((el) => (
        <tr>
            <td>{el.rest_name}</td>
            <td>{el.item}</td>
            <td>{el.quantity}</td>
            <td><button onClick={()=> removecart(el)}>Remove from cart</button></td>
            
        </tr>
    ));

    const functa = () => {
        if((JSON.stringify(cart) != "[]"))
        {
        setButtonPopup(true);
        }
        else{
            
        alert("Please add items in the cart!");
    
        }
        setFunct("abc");
    }

    return (
        
        
        <Fragment>
               <br></br>
            <UserNav/>
            
            <h1 className="large text"></h1>
               
               
                <div class="container">
                    <h2>List of All Books</h2>
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Food Type</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                
                                {details}
                            </tbody>
                            <div>
                                <button onClick={()=> functa()}>
                                    Checkout
                                </button>
                            </div>
                            
                            <div>
                                <h2>cart:</h2>
                                {cartItems}
                            </div>
                            <div>
                                Total : {carttotal}
                            </div>
                            <div>
                                Alert message : {alertt}
                            </div>
                        </table>
                </div> 
                <Popup trigger = {buttonPopup} setTrigger={setButtonPopup} >
                   
                   Items: {details1}
                   
                   <tr><b>Total : </b> {carttotal}</tr>
                   <Link to="/dashboard">
                   <button >
                        Exit
                   </button>
                   </Link>
                </Popup>
        </Fragment>
    )
}

Rest_landing.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile})(Rest_landing);

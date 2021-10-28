<ul>
<li>
  <Link to="/home">Developers</Link>
</li>
<li>
  <Link to="/home">Posts</Link>
</li>
<li>
  <Link to="/dashboard">
    <i className="fas fa-user" />{' '}
    <span className="hide-sm">Dashboard</span>
  </Link>
</li>
<li>
  <a onClick={logout} href="#!">
    <i className="fas fa-sign-out-alt" />{' '}
    <span className="hide-sm">Logout</span>
  </a>
</li>
</ul>
import React,{Fragment, useEffect,useState} from 'react';
import axios from 'axios';


function Rest_land_comp({props}) {
    const [peeps, setPeeps] = useState([]);
    console.log("hereeee");  
    console.log("Hellooo",props);  
    //var d=String(props.d);
    async function getData() {
        const req = await axios.post('/api/restaurant/order_list',{rest_name:"mr.biryani"});
        console.log(req);
        setPeeps(req);
      }
    useEffect(() => {getData();}, [])
    
    //console.log(a);
    //console.log(b);
    

    return (
        <div>
            <p> a </p>
        </div>
    )
}

export default Rest_land_comp;
/*
import React,{Fragment, useEffect,useState} from 'react';
import axios from 'axios';

const Rest_land_comp = (props) => {
    const [peeps, setPeeps] = useState([]);
    console.log(props.data.object);  
    var d=String(props.c);
    async function getData() {
        const req = await axios.post('/api/restaurant/order_list',{name:props.c});
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
                <p> {props.a} </p>
                {details}
            </div>
    )
}

export default Rest_land_comp;
*/
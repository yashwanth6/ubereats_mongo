import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import  Register  from './components/auth/Register';
import  Login  from './components/auth/Login';
import { Fragment, useEffect } from 'react';
import { Landing } from './components/layout/Landing';
import {Home} from './components/home/Home';
import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Rest_Login from './components/auth/Rest_Login';
import Rest_Register from './components/auth/Rest_Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Rest_landing from './components/dashboard/Rest_landing';
import  Profile from './components/dashboard/Profile';
import Rest_Dash from './components/dashboard/Rest_Dash';
import Rest_additems from './components/dashboard/Rest_additems';
import User_Profile from './components/dashboard/User_Profile';
import User_Orders from './components/dashboard/User_Orders';
import Prev_Orders from './components/dashboard/Prev_Orders';
import Completed_Orders from './components/dashboard/Completed_Orders';
import Dashboard2 from './components/dashboard/Dashboard2';
import EditOrders from './components/dashboard/EditOrders';
import UserFav from './components/dashboard/UserFav';
import Inkitchen_Orders from './components/dashboard/Inkitchen_Orders';
if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
          //store.dispatch(loadUser())
  },[]);
  // return (
  //   <div className="App">
  //     <Navbar />
  //   <p>Hello</p>
  // </div>
  // );
  return (
  <Provider store={store}>
  <Router>
      <Fragment>
        <Navbar />
          <Route exact path='/' component={Landing}></Route>
          <section className='container'>
          <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/rest_login" component={Rest_Login} />
              <Route exact path="/rest_register" component={Rest_Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/Rest_landing" component={Rest_landing}/>
              <Route exact path="/Profile" component={Profile}/>
              <Route exact path="/Rest_Dash" component={Rest_Dash}/>
              <Route exact path="/Rest_additems" component={Rest_additems}/>
              <Route exact path="/User_Profile" component={User_Profile}/>
              <Route exact path="/User_Orders" component={User_Orders}/>
              <Route exact path="/Prev_Orders" component={Prev_Orders}/>
              <Route exact path="/Completed_Orders" component={Completed_Orders}/>
              <Route exact path="/Dashboard2" component={Dashboard2}/>
              <Route exact path="/EditOrders" component={EditOrders}/>
              <Route exact path="/UserFav" component={UserFav}/>
              <Route exact path="/Inkitchen_Orders" component={Inkitchen_Orders}/>
            </Switch>
          </section>
      </Fragment>
  </Router>
  </Provider>
  );
}
export default App;

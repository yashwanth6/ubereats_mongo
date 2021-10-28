const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');
var cors = require('cors');
const {check, validationResult} = require('express-validator');
//const app = express();

const User = require('../../models/User');
const e = require('express');
const { json } = require('body-parser');

router.use(express.urlencoded({extended: true}));
router.use(express.json())
//app.use(express.json({extended: false}));



router.post('/me',(req,res) => {
    console.log("hi");
console.log(req.body);
const {email} = req.body;
 console.log(email);
 try{  
    User.findOne({email : email}, function(err,doc){
        if(err) throw err;
        if(doc){
            console.log("Found: "+email+", location="+doc.location);
            //console.log(doc);
            res.send(doc);
        }
        else{
            console.log("Not found: "+email);
        }
})
}
catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}
);

router.post('/getprofile',(req,res) => {
    console.log("hi");
console.log(req.body);
const {email} = req.body;
 console.log(email);
 try{  
    User.find({email : email}, function(err,doc){
        if(err) throw err;
        if(doc){
            res.send(doc);
        }
        else{
            console.log("Not found: "+email);
        }
})
}
catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
}
);

module.exports = router;
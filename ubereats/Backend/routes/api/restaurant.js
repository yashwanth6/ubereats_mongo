const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');
const multer = require('multer');
const gravatar = require('gravatar');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var kafka = require('../../kafka/client');
var cors = require('cors');
const {check, validationResult} = require('express-validator');
//const app = express();
const normalize = require('normalize-url');

const User = require('../../models/User');
const Owner=require('../../models/R_Owner');
const Item=require('../../models/Item_List');
const Order=require('../../models/Orders');
const e = require('express');

router.use(express.urlencoded({extended: true}));
router.use(express.json())


router.post(
    '/',
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
     check('password','please enter more chars').isLength({min: 6}),
    check('location','location is required').not().isEmpty(),
    check('type','Delivery Type is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password, location, type } = req.body;
  
      try {
        let owner = await Owner.findOne({ email });
  
        if (owner) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
  
        const avatar = normalize(
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          }),
          { forceHttps: true }
        );
  
        owner = new Owner({
          name,
          email,
          avatar,
          password,
          location,
          type
        });
  
        const salt = await bcrypt.genSalt(10);
  
        owner.password = await bcrypt.hash(password, salt);
  
        await owner.save();
  
        const payload = {
          owner: {
            id: owner.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );



router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password','password is required').exists()
  ], async (req,res) => {

    console.log(req.body);
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){

        return res.status(500).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    try{  
        connection.query(`SELECT * FROM restaurant
         WHERE email=? and password=?`,[email,password
    ],  function(error,results){
        if(results.length !== 0){
            res.send(JSON.stringify(results));
         }else{
            res.send("failure");
         }
      
     });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

router.post('/rest_list', function(req, res){

  kafka.make_request('rest_list',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
});

/*
router.post('/rest_list'
  , async (req,res) => {

    console.log(req.body);
    
    const {email} = req.body;
    
    try{  
        User.findOne({email : email}, function(err,doc){
            if(err) throw err;
            if(doc){
                console.log("Found: "+email+", location="+doc.location);
                //res.send(doc);
                const posts = Owner.find();
                Owner.find({}, function(err,doc1){
                    if(doc){
                        console.log("Found: "+email+", location="+doc1.location);
                        res.send(doc1);
                    }
                    else{
                        console.log("Not found: "+email);
                    }
                });
                
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
        });

*/
router.post('/order_list'
  , async (req,res) => {

    kafka.make_request('orderlist',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);

router.put('/changeprofile'
  , async (req,res) => {
  
    kafka.make_request('changeprofile',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);

router.post('/getprofile'
  , async (req,res) => {

    console.log(req.body);
    
    const {email} = req.body;
    try{  
    //     connection.query(`select * from users where email`,email,  function(error,results){
    //     if(results.length !== 0){
    //         console.log(results);
    //         res.send(JSON.stringify(results));
    //      }else{
    //         res.send("failure");
    //      }
        
    //  });
    User.find({email:email},function(err,doc){
      if(err) throw err;
      if(doc){
          console.log(doc);
          res.send(doc);
      }
    })
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);



router.post('/add_items'
  , async (req,res) => {

    kafka.make_request('additems',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
});
   
    
        

router.post('/get_items'
  , async (req,res) => {
    kafka.make_request('getitems',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);


router.post('/cart'
  , async (req,res) => {
    kafka.make_request('cart',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);

router.post('/getorders'
  , async (req,res) => {
    kafka.make_request('getorders',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
    
}
);

router.post('/getrestorders'
  , async (req,res) => {
    kafka.make_request('getrestorders',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
    
}
);



router.put('/updatestatus'
  , async (req,res) => {
    kafka.make_request('updatestatus',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);


router.post('/getcompletedorders'
  , async (req,res) => {
    //console.log("This is:"+req.body);
    const email = req.body.email;
    try{   
       
      Owner.findOne({email:email},function(err,doc){
        if(err) throw err;
        if(doc){
          console.log(doc.name);
          Order.find({rest_name:doc.name,foodstatus:"completed"},function(err,doc1){
            if(doc1){
              console.log(doc1);
                 res.send(doc1);
            }
            else{
              console.log("Not found!");
            }
          })
        }

   });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);


router.post('/getoneorder'
  , async (req,res) => {
    kafka.make_request('getoneorder',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
  });



  router.put('/edit_orders'
  , async (req,res) => {
    console.log("hjjjjjjhgggg");
    console.log(req.body);
    kafka.make_request('editorders',req.body, function(err,results){
      console.log('in result');
      console.log("--------------------");
      console.log(results);
      res.send(results);
  });
}
);

router.put('/addfavorite'
  , async (req,res) => {
    kafka.make_request('addfav',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });

  });


  router.post('/getfav'
  , async (req,res) => {
    kafka.make_request('getfav',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });

  });

  router.put('/updatestatus1'
  , async (req,res) => {

    kafka.make_request('updatestatus1',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);

router.put('/updatestatus2'
  , async (req,res) => {

    kafka.make_request('updatestatus2',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);


router.post('/getinkitchenorders'
  , async (req,res) => {
    kafka.make_request('getinkitchenorders',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      res.send(results);
  });
}
);

module.exports = router;
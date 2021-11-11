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

    console.log(req.body);
    
    const {rest_name} = req.body;
    try{  
       
      Item.find({rest_name : rest_name}, function(err,doc){
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

router.put('/changeprofile'
  , async (req,res) => {
  
    const {email,uname,location,dateofbirth,mobile,nickname} = req.body;
    try{  
      User.findOneAndUpdate({email:email},req.body)
      .then((result) =>{
         //console.log(result);
         res.send("success");
      })
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

router.post('/getprofile'
  , async (req,res) => {

    console.log(req.body);
    
    const {email} = req.body;
    try{  
        connection.query(`select * from users where email`,email,  function(error,results){
        if(results.length !== 0){
            console.log(results);
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



router.post('/add_items'
  , async (req,res) => {

    console.log(req.body);
    
    const {email,item_name,foodtype,price} = req.body;
   
    try{   
      let ob = await Owner.findOne({ email });
      if(ob){
          item = new Item({
            rest_name:ob.name,
            item_name,
            foodtype,
            price
          });
          
          item.save();
          res.send("success");
        }
        else{
          console.log("Item cant be added!");
        }

    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

router.post('/get_items'
  , async (req,res) => {

    console.log(req.body);
    
    const {email} = req.body;
    try{  
        Owner.findOne({email:email},function(err,doc){
          if(err) throw err;
          if(doc){
            console.log(doc.name);
            Item.find({rest_name:doc.name},function(err,doc1){
              if(doc1){
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


router.post('/cart'
  , async (req,res) => {
    console.log(req.body);
    const {rest_name,email,total,delivery} = req.body;
    const it=JSON.parse(JSON.stringify(req.body.cart));
    console.log("hi:   "+it);
    try{   
       
            // connection.query(`Insert into orders(rest_name,items,price,foodstatus,email,delivery) values(?,?,?,?,?,?)`,[rest_name,
            // it,total,"active",email,delivery],  function(error,results){
            // console.log(results);
            // res.send(JSON.stringify(results));
            // });
            if(true){
                order = new Order({
                  rest_name,
                  items:it,
                  price:total,
                  foodstatus:"active",
                  email,
                  delivery
                });
                
                order.save();
                res.send("success");
              }
              else{
                console.log("Item cant be added!");
              }

         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

router.post('/getorders'
  , async (req,res) => {
    console.log(req.body);
    const {email} = req.body;
    try{   
       Order.find({email:email},function(err,doc){
        if(err) throw err;
        console.log(doc);
        //console.log(JSON.parse(doc.items));
        if(doc){
          res.send(doc);
        }
        else{
          console.log("Error!");
        }

   });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

router.post('/getrestorders'
  , async (req,res) => {
    //console.log("This is:"+req.body);
    const email = req.body.email;
    try{   
       
            connection.query(`select name from restaurant where email=?`,email,  function(error,results){
            var results=JSON.parse(JSON.stringify(results));
            console.log(results[0].name);
            connection.query(`select * from orders where rest_name=? and foodstatus=?`,[results[0].name,"active"],
              function(error,results){
                console.log("jabbbbb "+ results);
                res.send(JSON.stringify(results));
            });
           
            });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);



router.put('/updatestatus'
  , async (req,res) => {

    const {status} = req.body;
    try{  
        connection.query(`UPDATE orders set foodstatus=? where orderid=?`,["completed",status],  function(error,results){
        if(results.length !== 0){
            console.log(results);
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


router.post('/getcompletedorders'
  , async (req,res) => {
    //console.log("This is:"+req.body);
    const email = req.body.email;
    try{   
       
            connection.query(`select name from restaurant where email=?`,email,  function(error,results){
            var results=JSON.parse(JSON.stringify(results));
            console.log(results[0].name);
            connection.query(`select * from orders where rest_name=? and foodstatus=?`,[results[0].name,"completed"],
              function(error,results){
                console.log("jabbbbb "+ results);
                res.send(JSON.stringify(results));
            });
           
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
      const id=req.body.id;
      try{   
       
        connection.query(`select * from ord_list where id=?`,id,  function(error,results){
            console.log(results);
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

  });



  router.put('/edit_orders'
  , async (req,res) => {

    const {item,foodtype,price,id} = req.body;
    try{  
        connection.query(`UPDATE ord_list set item=?,foodtype=?,price=? where id=?`,
        [item,foodtype,price,id],  function(error,results){
        if(results.length !== 0){
            console.log(results);
            res.send("success");
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

router.put('/addfavorite'
  , async (req,res) => {
      const {favorite,email} = req.body;
      try{   
       console.log(req.body.favorite);
       User.findOneAndUpdate({email},{$push:{favorite:favorite}},function(err,doc){
         if(doc){
           console.log("hurray!");
         }
              res.send("success");
       });
    }
    catch(err){
        console.error(err.message);
        res.send("server error");
    }

  });


  router.post('/getfav'
  , async (req,res) => {
      const {email} = req.body;
      try{   
       
        User.findOne({email:email},function(err,doc){
          if(err) throw err;
          if(doc){
            console.log(doc.favorite);
            var fav=doc.favorite
            Owner.find({name:fav},function(err,doc1){
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

  });

  router.put('/updatestatus1'
  , async (req,res) => {

    const {status} = req.body;
    try{  
        connection.query(`UPDATE orders set foodstatus=? where orderid=?`,["inkitchen",status],  function(error,results){
        if(results.length !== 0){
            console.log(results);
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

router.put('/updatestatus2'
  , async (req,res) => {

    const {status} = req.body;
    try{  
        connection.query(`UPDATE orders set foodstatus=? where orderid=?`,["delivered",status],  function(error,results){
        if(results.length !== 0){
            console.log(results);
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


router.post('/getinkitchenorders'
  , async (req,res) => {
    //console.log("This is:"+req.body);
    const email = req.body.email;
    try{   
       
            connection.query(`select name from restaurant where email=?`,email,  function(error,results){
            var results=JSON.parse(JSON.stringify(results));
            console.log(results[0].name);
            connection.query(`select * from orders where rest_name=? and foodstatus=?`,[results[0].name,"inkitchen"],
              function(error,results){
                console.log("jabbbbb "+ results);
                res.send(JSON.stringify(results));
            });
           
            });
         }
        
    
    catch(err){
        console.error(err.message);
        res.send("server error");
    }
}
);

module.exports = router;
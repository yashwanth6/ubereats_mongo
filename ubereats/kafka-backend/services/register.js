var User =require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const connectDB = require('../config/db');

connectDB();

async function handle_request(msg, callback){
  
    var response = {};
    
    
      
        const { name, email, password, location } = msg;

        try {
          let user = await User.findOne({ email });
    
          if (user) {

              response.status = 400;
              response.message = 'User already exists';
             return callback(null, response);
          }
    
          
    
          user = new User({
            name,
            email,
            password,
            location
          });
    
          const salt = await bcrypt.genSalt(10);
    
          user.password = await bcrypt.hash(password, salt);
    
          await user.save();
    
          const payload = {
            user: {
              id: user.id
            }
          };
    
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
              if (err) throw err;
              response.status = 200;
              response.message = {token};
             return callback(null, response);
            }
          );
        
       
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;
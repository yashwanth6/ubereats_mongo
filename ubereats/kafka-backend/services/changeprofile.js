var User =require('../models/User');

async function handle_request(msg, callback){
  
    var response = {};
    
    const {email,uname,location,dateofbirth,mobile,nickname} = msg;
    try{  
      User.findOneAndUpdate({email:email},msg)
      .then((result) =>{
         //console.log(result);
         callback(null,"success");
      })
    }
       
    catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;
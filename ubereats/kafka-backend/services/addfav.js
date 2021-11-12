var User =require('../models/User');
async function handle_request(msg, callback){
  
    var response = {};
    const {favorite,email} = msg;
      try{   
       console.log(req.body.favorite);
       User.findOneAndUpdate({email},{$push:{favorite:favorite}},function(err,doc){
         if(doc){
           console.log("hurray!");
         }
             callback(null,"success");
       });
    }
       
    catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;

var Order =require('../models/Orders');
async function handle_request(msg, callback){
  
    var response = {};
    
    console.log(msg);
    const {email} = msg;
    try{   
       Order.find({email:email},function(err,doc){
        if(err) throw err;
        console.log(doc);
        if(doc){
          callback(null,doc);
        }
        else{
          console.log("Error!");
        }

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
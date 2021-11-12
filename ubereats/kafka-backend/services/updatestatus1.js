
var Order =require('../models/Orders');
async function handle_request(msg, callback){
  
    var response = {};
    
    const {status} = msg;
    try{  
        
         Order.findOneAndUpdate({_id:status},{$set:{foodstatus:"inkitchen"}},{new: true},function(err,doc){
               if(err) throw err;
               if(doc){
                   callback(null,doc);
               }
               else{
                   callback(null,"failure");
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
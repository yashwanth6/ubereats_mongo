
var Item =require('../models/Item_List');
async function handle_request(msg, callback){
  
    var response = {};
    console.log("message:" + msg._id);
    const {_id}=msg;
    try{   
     
        Item.find({_id:_id},  function(error,doc){
          console.log(doc);
          if(doc){
              callback(null,doc);
           }else{
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
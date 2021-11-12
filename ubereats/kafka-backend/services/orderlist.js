
var Item =require('../models/Item_List');

async function handle_request(msg, callback){
  
    var response = {};
    //console.log(req.body);
    
    const {rest_name} = msg;
    try{  
       
      Item.find({rest_name : rest_name}, function(err,doc){
        if(err) throw err;
        if(doc){
            console.log(doc);
            callback(null,doc);
        }
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
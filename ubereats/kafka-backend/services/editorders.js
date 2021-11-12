
var Item =require('../models/Item_List');
async function handle_request(msg, callback){
  
    var response = {};
    //console.log(JSON.stringify(msg));
    const {item_name,foodtype,price,_id} = msg;
    
    try{
        Item.findOneAndUpdate({_id:_id},{$set:{item_name:item_name,foodtype:foodtype,price:price}},{new: true},function(err,doc){
            if(err) throw err;
            if(doc){
                console.log(doc);
                callback(null,"success");
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
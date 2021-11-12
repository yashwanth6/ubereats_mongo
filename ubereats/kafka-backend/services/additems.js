var Owner =require('../models/R_Owner');
var Item =require('../models/Item_List');

async function handle_request(msg, callback){
  
    var response = {};
    
    const {email,item_name,foodtype,price} = msg;
   
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
          callback(null,"success");
        }
        else{
          console.log("Item cant be added!");
        }

    }
       
    catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
    

exports.handle_request = handle_request;
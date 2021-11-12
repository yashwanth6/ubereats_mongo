
var Owner =require('../models/R_Owner');
var Item =require('../models/Item_List');

async function handle_request(msg, callback){
  
    var response = {};
    
    console.log(msg);
    
    const {email} = msg;
    try{  
        Owner.findOne({email:email},function(err,doc){
          if(err) throw err;
          if(doc){
            console.log(doc.name);
            Item.find({rest_name:doc.name},function(err,doc1){
              if(doc1){
                   callback(null,doc1);
              }
              else{
                console.log("Not found!");
              }
            })
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
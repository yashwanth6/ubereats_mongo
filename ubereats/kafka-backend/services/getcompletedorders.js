var Owner =require('../models/R_Owner');
var Order =require('../models/Orders');
async function handle_request(msg, callback){
  
    var response = {};
    
    const email = req.body.email;
    try{   
       
      Owner.findOne({email:email},function(err,doc){
        if(err) throw err;
        if(doc){
          console.log(doc.name);
          Order.find({rest_name:doc.name,foodstatus:"completed"},function(err,doc1){
            if(doc1){
              console.log(doc1);
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
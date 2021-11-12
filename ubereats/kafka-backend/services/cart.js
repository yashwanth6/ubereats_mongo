

async function handle_request(msg, callback){
  
    var response = {};
    
    console.log(req.body);
    const {rest_name,email,total,delivery} = msg;
    const it=JSON.parse(JSON.stringify(msg.cart));
    console.log("hi:   "+it);
    try{   
       
            
            if(true){
                order = new Order({
                  rest_name,
                  items:it,
                  price:total,
                  foodstatus:"active",
                  email,
                  delivery
                });
                
                order.save();
                res.send("success");
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
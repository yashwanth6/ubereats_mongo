var User =require('../models/User');
var Owner =require('../models/R_Owner');
const connectDB = require('../config/db');


connectDB();

function handle_request(msg, callback){
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka get jobs by recruiter backend");

    let resp = {};
    try {
        var email = msg.email;

        User.findOne({email : email}, function(err,doc){
            if(err) throw err;
            if(doc){
                console.log("Found: "+email+", location="+doc.location);
                //callback(null,doc);
                const posts = Owner.find();
                Owner.find({}, function(err,doc1){
                    if(doc){
                        console.log("Found: "+email+", location="+doc1.location);
                        callback(null,doc1);
                    }
                    else{
                        console.log("Not found: "+email);
                    }
                });
                
            }
            else{
                console.log("Not found: "+email);
            }
    })

    } catch (err) {
        console.log("Error: ", err);
        callback(null,"Cannot connect to db");
    }
    //callback(null, resp);
}
    

exports.handle_request = handle_request;
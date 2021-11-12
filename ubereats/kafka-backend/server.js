var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Books = require('./services/books.js');
var rest_list=require('./services/rest_list.js');
var login=require('./services/login');
var register=require('./services/register');
var restregister=require('./services/restregister');
var restlogin=require('./services/restlogin');
var orderlist=require('./services/orderlist');
var changeprofile=require('./services/changeprofile');
var additems=require('./services/additems');
var getitems=require('./services/getitems');
var cart=require('./services/cart');
var getorders=require('./services/getorders');
var getrestorders=require('./services/getrestorders');
var updatestatus=require('./services/updatestatus');
var getcompletedorders=require('./services/getcompletedorders');
var getoneorder=require('./services/getoneorder');
var editorders=require('./services/editorders');
var addfav=require('./services/addfav');
var getfav=require('./services/getfav');
var updatestatus1=require('./services/updatestatus1');
var updatestatus2=require('./services/updatestatus2');
var getinkitchenorders=require('./services/getinkitchenorders');



var connectDB = require('./config/db');

connectDB();

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book",Books)
handleTopicRequest("rest_list",rest_list)
handleTopicRequest("login",login)
handleTopicRequest("register",register)
handleTopicRequest("restregister",restregister)
handleTopicRequest("restlogin",restlogin)
handleTopicRequest("orderlist",orderlist)
handleTopicRequest("changeprofile",changeprofile)
handleTopicRequest("additems",additems)
handleTopicRequest("getitems",getitems)
handleTopicRequest("cart",cart)
handleTopicRequest("getorders",getorders)
handleTopicRequest("getrestorders",getrestorders)
handleTopicRequest("updatestatus",updatestatus)
handleTopicRequest("getcompletedorders",getcompletedorders)
handleTopicRequest("getoneorder",getoneorder)
handleTopicRequest("editorders",editorders)
handleTopicRequest("addfav",addfav)
handleTopicRequest("getfav",getfav)
handleTopicRequest("updatestatus1",updatestatus1)
handleTopicRequest("updatestatus2",updatestatus2)
handleTopicRequest("getinkitchenorders",getinkitchenorders)

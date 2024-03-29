const express = require('express');
const session = require('express-session');
const app = express();
var kafka = require('./kafka/client');

var cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

app.use(cors({origin:"http://18.117.73.186:3000", credentials:true}));

app.get('/',(req,res) => res.send('API Running'));

connectDB();

// Init Middleware
app.use(express.json());

app.get('/test_api',async function(req,res){
    await connection.query('SELECT * from users', async function(error,results){
        if(error){
            res.writeHead(200, {
                'Content-Type': 'text-plain'
            });
            res.send(error.code);
        }else{
            res.writeHead(200,{
                'Content-Type': 'text/plain'
            });
            res.end(JSON.stringify(results));
        }
    });
});

app.post('/book', function(req, res){

    kafka.make_request('post_book',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});
// app.post('/create',async function(req,res){
//     await connection.query(`Insert into test_table(uname,email,password)values(?,?,?)`,[req.body.uname,
//         request.body.email,request.body.password], async function(error,results){
//         if(error){
//             res.writeHead(200, {
//                 'Content-Type': 'text-plain'
//             });
//             res.send(error.code);
//         }else{
//             res.writeHead(200,{
//                 'Content-Type': 'text/plain'
//             });
//             res.end(JSON.stringify(results));
//         }
//     });
//     res.send(req.body);
// });


//Defining Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/restaurant', require('./routes/api/restaurant'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
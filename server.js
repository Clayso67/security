const express = require('express');//import the library
const port = 3000;
const bodyParser = require('body-parser');//body-parder is called middleware
const app = express();//use the library
const md5 = require('md5');
const redis = require('redis');

const redisClient = redis.createClient();

app.use(bodyParser.json());//use the middleware (call it before anything else happens on each request)

app.listen(port, ()=>{
    console.log("listening...")
});

app.post('/login',async (req,res)=>{//a post is when a client sends information to an API

    const reqHashedPassword = md5(req.body.password)
    const redisHashedPassword = await redisClient.hGet('password',request.body.userName);

    console.log('Request Body',JSON.stringify(req.body));
    const loginRequest = req.body;
    //search database for username and retrieve current password

    
    //compare the hashed version of the password that was sent with the hashed version from the database


    if (loginRequest.userName=="rusty@mail.com" && loginRequest.password==hashedPasswordFromUser){
        res.status(200);
        res.send("Welcome");
    } else{
        res.status(401);
        res.send("Unauthorized");
        }
});

app.get('/',(req,res)=>{//every time something calls your API, that is a request
    res.send("HOLY CRAP ITS WORKING!")//a response is when an API gives the inofrmation requested
});
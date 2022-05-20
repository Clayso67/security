const express = require('express');//import the library
const port = 3000;
const bodyParser = require('body-parser');//body-parder is called middleware
const app = express();//use the library
const md5 = require('md5');
const {createClient} = require('redis');
const redisClient = createClient(
{
        socket:{
            port:6379,
            host:"127.0.0.1"
        }
}
);

app.use(bodyParser.json());//use the middleware (call it before anything else happens on each request)
redisClient.connect();

app.listen(port, async ()=>{
    console.log("listening on port: " +port);
})
const validatePassword = async(request, response)=>{
    
    const requestHashedPassword = md5(request.body.password)
    const redisHashedPassword = await redisClient.hGet('password',request.body.userName);
    const loginRequest = request.body;
    console.log('Request Body',JSON.stringify(request.body));
    //search database for username and retrieve current password
    //compare the hashed version of the password that was sent with the hashed version from the database
    if (requestHashedPassword==redisHashedPassword){
        response.status(200);
        response.send("Welcome");
    } else{
        response.status(401);
        response.send("Unauthorized");
        }
};

app.post('/login', validatePassword);
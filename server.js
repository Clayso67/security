const express = require('express');
const port = 3000;
const https = require('https');
const bodyParser = require('body-parser');
const md5 = require('md5');
const {createClient} = require('redis');
const fs = require('fs');


const redisClient = createClient(
    {
        socket:{
            port: 6379,
            host: '127.0.0.1'
        }
    }
);


const app = express();
app.use(bodyParser.json());




https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'p@ssw0rd'
}, app).listen(port, async ()=>{
    await redisClient.connect();
    console.log("listening on port:"+port);
});



const validatePassword = async(req,res) => {
    
    const reqHashedPassword = md5(req.body.password);
    const redisHashedPassword = await redisClient.hGet('password',req.body.userName);
    const loginRequest = req.body;
    console.log('Request Body',JSON.stringify(req.body));
    

    

    if (loginRequest.userName=="username@gmail.com" && reqHashedPassword == redisHashedPassword){
        res.status(200);
        res.send("Welcome");
    } else{
        res.status(401);
        res.send("Unauthorized");
        }
};



const signup = async(req,res) =>{

    const hashedNewPassword = md5(req.body.newPassword);
    await redisClient.hSet('password', req.body.newUserName, hashedNewPassword);
    res.status(200);
    res.send({result:"Saved"});

}




app.get('/',(req,res)=>{
    res.send("connected!")
});




app.post('/signup', signup);

app.post('/login', validatePassword);
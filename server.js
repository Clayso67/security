const express = require('express');//import the library
const bodyParser = require('body-parser');
const port = 3000;
const app = express();//use the library

app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log("listening on port: "+port);
})

app.get('/',(request,response)=>{response.send('hello')
});

app.post('/login',(request,response)=>{
    const loginRequest = request.body;
    if (loginRequest.userName=='rusty@mail.com' && loginRequest.password=='N0pa$$'){
        response.status(200);
        // console.log(loginRequest.userName);
        response.send('Welcome');
    } else {
        response.status(401);
        response.send('Unauthorized');
        // console.log(loginRequest.userName);
    }
});
//body parser redis git
const express = require('express');

const server = express();
//localhost:3000/teste

server.use(express.json());

// Query params = ?teste=1
// Route Params = /users/1
// Request body = { "name": 'Alessandro, "email": 'Alessandro.piazzati@gmail.com'}

//CRUD
//Create - Read - Update - Delete

const users = [ 'Alessandro', 'Karol', 'Palmito' ];

server.use((req,res, next)=>{
    console.time('Request');
    console.log(`Metodo :${req.method}; $URL: ${req.url} `);

    next();
    console.log("Finalizou");
    console.timeEnd('Request')
})

server.get('/users', (req, res) =>{
    return res.json(users);
})

function checkUserExists(req,res,next){
    if(!req.body.name){
        return res.status(400).json({error: 'user name is required'});
    }

    return next();
}

function checkUserInArray(req,res,next){
    const user = users[req.params.index];
    if(!user){
        return res.status(400).json({ error: 'User does not exists' });
    }
    req.user = user;
    return next();
}

server.get('/users/:index', checkUserInArray, (req, res) =>{
   
    return res.json(req.user);
});

server.post('/users', checkUserExists, (req,res)=>{
    const { name } = req.body;
    
    users.push(name);

    return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req,res)=>{
    const { index } = req.params;
    const { name }  = req.body;
    users[index] = name;
    return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req,res)=>{
    const { index } = req.params;
    users.splice(index, 1);
    return res.send()
});

server.listen(3000);


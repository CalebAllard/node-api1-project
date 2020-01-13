// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db.js');
//midware
server.use(express.json());

// get items
server.get('/api/users', (req,res) => {
    db.find().then(users => {
        
            res.status(200).json(users);
        
    }).catch(err => {
        res.status(500).json({errMessage: "err receving users from database"});
    });
    
});
///get by id

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if(!user){
                res.status(400).json({errMessage: `no user found with the ID of:${id} `});
            }else{
                res.status(200).json(user);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errMessage: "Server Error while getting user"});
        });
});

//post items
server.post('/api/users', (req,res) => {
    userData = req.body;
    db.insert(userData).then( user => {
        
        db.findById(user.id).then( user => res.status(200).json(user)).catch(err => console.log(err));
    }).catch(err => {
        res.status(500).json({errMessage: "err creating user"});
    })
});
//delete items
server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
        db.findById(id).then(user => { 
            db.remove(id)
            .then(resp => {
                res.status(200).json(user);
            }).catch(err => {
                res.status(500).json({errMessage: "err deleteing user"});
            });
        }).catch(err => {res.status(500).json({errMessage: "Errr deleting User"})});

   
    
});


//edit items
server.put('/api/users/:id',(req,res) => {
    const id = req.params.id;
    const data = req.body;

    db.update(id,data)
        .then(ret => {
            res.status(201).json(ret);
        }).catch(err => {
            res.status(500).json({errMessage:"error updating user"});
        });
});




const port = 8000;
server.listen(port,() => console.log(`server runnning on port:${port}`));
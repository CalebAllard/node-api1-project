// implement your API here
const express = require('express');
const cors = require('cors');
const server = express();
const db = require('./data/db.js');
//midware
server.use(express.json());
server.use(cors());

// get items
server.get('/api/users', (req,res) => {
    db.find().then(users => {
        
            res.status(200).json(users);
        
    }).catch(err => {
        res.status(500).json({errorMessage: "The users information could not be retrieved."});
    });
    
});
///get by id

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist."});
            }else{
                res.status(200).json(user);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "The user information could not be retrieved."});
        });
});

//post items
server.post('/api/users', (req,res) => {
    userData = req.body;
    if(!userData.name || !userData.bio ){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    }else{
        db.insert(userData)
            .then( user => {
            
                db.findById(user.id).then( user => res.status(201).json(user)).catch(err => console.log(err));
            }).catch(err => {
                res.status(500).json({errorMessage: "There was an error while saving the user to the database"});
            })
    }
});
//delete items
server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
        db.findById(id).then(user => { 
            if(!user){
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }else{
       
                db.remove(id)
                .then(resp => {
                    res.status(200).json(user);
                }).catch(err => {
                    res.status(500).json({errorMessage: "The user could not be removed"});
                });
            }
       
        }).catch(err => {res.status(500).json({message: "The user with the specified ID does not exist."})});

   
    
});


//edit items
server.put('/api/users/:id',(req,res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(req);
    db.findById(id)
        .then(user => { 
            if(!user){
                res.status(400).json({errMessage: "The user with the specified ID does not exist."})
            }else{
                db.update(id,data)
                    .then(ret => {
                        res.status(200).json(ret);
                    }).catch(err => {
                        res.status(500).json({ errorMessage: "The user information could not be modified." });
                    });
            }
        }).catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be modified." })
    });
});




const port =  process.env.PORT || 4000;
server.listen(port,() => console.log(`server runnning on port:${port}`));
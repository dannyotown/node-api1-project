// implement your API here
const express = require("express")
const app = express();
const db = require('./data/db')
app.use(express.json())

app.get('/users',(req,res)=>{
    db.find().then(result => res.send(result))
})
app.get('/users/:id',(req,res)=>{
    db.findById(req.params.id).then(result=> res.send(result))
})

app.post('/users', (req, res)=>{
    if(!req.body.name || !req.body.bio){
       return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else{
        db.insert({
            name: req.body.name,
            bio: req.body.bio
        })
        .then(
            result => res.send(result)
        )
    }
})
app.listen(80,"127.0.0.1",()=>{
    console.log("App Listening on port 80")
})

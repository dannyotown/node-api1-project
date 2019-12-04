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
app.delete('/users/:id', (req,res)=>{
    const user = db.find(row => row.id === req.params.id)
    if(user){
        db.remove(req.params.id).then(result => res.send(result))
    }else{
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

app.put('/users/:id', (req, res)=>{
    let id = req.params.id;
    let info = req.body
    db.update(id,info).then(result => res.json({success: result}))
})

app.listen(80,"127.0.0.1",()=>{
    console.log("App Listening on port 80")
})

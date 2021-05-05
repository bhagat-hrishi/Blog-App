const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes} = require('crypto');
const axios = require('axios');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts={};

app.post('/posts',async(req,res)=>{

    const id=randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id]={
        id,//same as id:id
        title//same as title : title
    }

    //New post created now emitting event
   await  axios.post('http://localhost:4005/events',{
        type:"PostCreated",
        data:{
            id,
            title
        }
    })


    res.status(201).send(posts[id]);
})

app.get('/posts',(req,res)=>{
    res.send(posts);
})

// To listen event from event-bus
app.post('/events',(req,res)=>{
    console.log(`Received : ${req.body.type}`)

    res.send({});
})

const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Posts service started  on ${PORT}`)
})
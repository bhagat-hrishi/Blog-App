const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {randomBytes} = require('crypto');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts={};

app.post('/posts',(req,res)=>{

    const id=randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id]={
        id,//same as id:id
        title//same as title : title
    }

    res.status(201).send(posts[id]);
})

app.get('/posts',(req,res)=>{
    res.send(posts);
})

const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})
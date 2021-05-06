const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


const storeEvents = [];

app.post('/events',(req,res)=>{

    const event = req.body;

    storeEvents.push(event);
    axios.post('http://localhost:4000/events',event)
    .catch((err) => {
        console.log(err.message);
    });//posts
    axios.post('http://localhost:4001/events',event).catch((err) => {
        console.log(err.message);
    });;//comments
    axios.post('http://localhost:4002/events',event).catch((err) => {
        console.log(err.message);
    });;//query
    axios.post('http://localhost:4003/events',event).catch((err) => {
        console.log(err.message);
    });;//moderation service

    res.send({status:"OK"})
})

// To get all events
app.get('/events',(req,res)=>{
    res.send(storeEvents);
})

const PORT=4005;
app.listen(PORT,()=>{
    console.log(`Event Bus started on PORT ${PORT}`);
})
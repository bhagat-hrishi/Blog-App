const express = require('express');
const bodyParser = require('body-parser');
const axios  = require('axios');

const app=express();
app.use(bodyParser.json());


app.post('/events', async (req,res)=>{

    const {type , data}=req.body;
    // console.log(req.body);
    if(type == "CommentCreated"){
        // check if "orange present or not and decide to reject or approve"
        const status = data.content.includes('orange') ? "rejected" : "approved";


        await    axios.post('http://localhost:4005/events',{
            type:"CommentModerated",
            data:{
                id : data.id ,
                content : data.content,
                status,
                postId : data.postId
                
            }
        })
    }
    
    res.send({});
});

const PORT = 4003;

app.listen(PORT,()=>{
    console.log(`Moderation Service started on ${PORT}`);
})
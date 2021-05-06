const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts={};

/**
posts === {
    '123':{
    console.log(`Moderation Servic
        id:'123',
        title:'This is title of post',
        comments:[
            { 
                id:'1cdcd',
                content:'comment1 
            }
        ]
    }
}
 */

const handleEvent  = (type,data)=>{

    if(type === "PostCreated"){

        const {id,title}=data;
        posts[id]={
            id,
            title,
            comments:[]
        }
    }
    if(type==="CommentCreated"){
        const {id,content,postId,status} = data;

        const post = posts[postId];
        post.comments.push({
            id,
            content,
            status
        })

    }
    if(type === "CommentedUpdated"){
        const {id,content,postId,status} = data;

        const post = posts[postId];

        const comment  = post.comments.find( singleComment =>{
            return singleComment.id === id;
        })

        comment.status = status;
        comment.content = content;
    }

}


 // To get all posts
app.get('/posts',(req,res)=>{

    res.send(posts);

})

//To receive event from event bus
app.post('/events',(req,res)=>{

    const {type,data}=req.body;

    handleEvent(type,data);


    
    // console.log(posts);
    res.send({});

})

const PORT=4002;

app.listen(PORT, async()=>{
    console.log(`Query service started on  ${PORT}`)

    const res= await axios.get('http://localhost:4005/events')

    for(let event of res.data){
        console.log('processing event',event.type);

        handleEvent(event.type , event.data);
    }
})
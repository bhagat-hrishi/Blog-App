const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts={};

/**
posts === {
    '123':{
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
// To get all posts
app.get('/posts',(req,res)=>{

    res.send(posts);

})

//To receive event from event bus
app.post('/events',(req,res)=>{

    const {type,data}=req.body;

    if(type === "PostCreated"){

        const {id,title}=data;
        posts[id]={
            id,
            title,
            comments:[]
        }
    }
    else if(type==="CommentCreated"){
        const {id,content,postId} = data;

        const post = posts[postId];
        post.comments.push({
            id,
            content
        })

    }

    console.log(posts);
    res.send({});

})

const PORT=4002;

app.listen(PORT,()=>{
    console.log(`Query service started on  ${PORT}`)
})
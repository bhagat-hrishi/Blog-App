const epxress = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = epxress();
app.use(bodyParser.json())

app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req,res)=>{
    
    
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async(req,res)=>{

    const commentId = randomBytes(4).toString('hex');

    // console.log(req.body);
    const {content} = req.body

    // console.log(content);
    const comments = commentsByPostId[req.params.id] || [];
    
    comments.push({
        id:commentId,
        content:content,
        status:"pending"
    })

    commentsByPostId[req.params.id]=comments;

    // Now new comment created now emmit event
  await  axios.post('http://localhost:4005/events',{
        type:"CommentCreated",
        data:{
            id:commentId,
            content,
            status:"pending",
            postId:req.params.id
        }
    })



    // console.log(commentsByPostId)
    res.status(201).send(comments);

})

// To listen event from event-bus
app.post('/events', async (req,res)=>{
    // console.log(`Received : ${req.body.type}`)

    const {type,data}= req.body;

    // console.log(req.body);

    if(type=="CommentModerated"){
        const {postId ,id , status ,content } = data;
        
        const allCommentsRelatedToPost  = commentsByPostId[postId];

        const comment = allCommentsRelatedToPost.find( comment =>{
            return comment.id === id;
        });

        comment.status = status;

        await axios.post('http://localhost:4005/events',{
            type : "CommentedUpdated",
            data:{
                id,
                status,
                content,
                postId
            }
        })
    }

    res.send({});
})

const PORT = 4001;
app.listen(PORT,()=>{
    console.log(`Comments service started on PORT ${PORT}`)
})
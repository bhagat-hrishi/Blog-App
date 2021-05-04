const epxress = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = epxress();
app.use(bodyParser.json())

app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments',(req,res)=>{
    
    
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments',(req,res)=>{

    const commentId = randomBytes(4).toString('hex');

    // console.log(req.body);
    const {content} = req.body

    // console.log(content);
    const comments = commentsByPostId[req.params.id] || [];
    
    comments.push({
        id:commentId,
        content:content
    })

    commentsByPostId[req.params.id]=comments;

    // console.log(commentsByPostId)
    res.status(201).send(comments);

})

const PORT = 4001;

app.listen(PORT,()=>{
    console.log(`Server Started on PORT ${PORT}`)
})
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList'

export default ()=>{

    const [posts, setPosts] = useState({});

    const fetchPosts = async ()=>{
        const res=await axios.get('http://localhost:4000/posts');

        setPosts(res.data);
    }

    useEffect(()=>{
        fetchPosts();
    },[])
    
    console.log(posts)
    //Object.values return array of values of object for all keys
    //https://www.geeksforgeeks.org/object-values-javascript/

   const renderPosts = Object.values(posts).map(singlePost =>{
       return(
           <div 
            className="card" 
            style={{width:'30%',marginBottom:'20px'}}
            key={singlePost.id}
            >
                <div className='card-body'>
                    <h3>{singlePost.title}</h3>
                    <CommentList postId={singlePost.id}/>
                    <CommentCreate postId={singlePost.id} />
                    </div>  
                </div>
       )
   }) 
   return(
    <div className='d-flex flex-row flex-wrap justify-content-between'>
        {
            renderPosts
        }
    </div>
   )
}
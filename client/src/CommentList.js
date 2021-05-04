import axios from 'axios';
import React,{useState,useEffect} from 'react';


export default ({postId})=>{
    
    const [comments, setComments] = useState([]);
 
    const fetchComments = async ()=>{
        const resp = await axios.get(`http://localhost:4001/posts/${postId}/comments`)

        console.log(resp.data);
        setComments(resp.data)
    }
    
    useEffect(()=>{
        fetchComments();
    },[])


    const renderedComments = comments.map(singleComment =>{
       
        return(
            <li key={singleComment.id}>
            {singleComment.content} 
         </li>
        )
    })
    return(
        <ul>
            {renderedComments}
        </ul>
    )
}
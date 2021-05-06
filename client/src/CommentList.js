
import React from 'react';


export default ({comments})=>{

    const renderedComments = comments.map(singleComment =>{

        let content ;
        if(singleComment.status == "approved"){
            content = singleComment.content;
        }
        if(singleComment.status == "pending"){
            content =  "This comment is awaiting moderation"
        }
        if(singleComment.status == "rejected"){
            content = "This comment is rejected"
        }
       return(
            <li key={singleComment.id}>
            {content} 
         </li>
        )
    })
    return(
        <ul>
            {renderedComments}
        </ul>
    )
}
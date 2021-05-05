
import React from 'react';


export default ({comments})=>{

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
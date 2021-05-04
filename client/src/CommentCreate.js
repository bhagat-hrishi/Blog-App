import React, { useState } from 'react'
import axios from 'axios'

export default ({ postId }) => {

    const [comment, setComment] = useState("");

    const formsubmitHandler = async (event)=>{
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
            content:comment
        })
        setComment("");
    }

    return(
        <div>
            <form onSubmit={formsubmitHandler}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input
                        value={comment}
                        onChange={(event) => {
                            setComment(event.target.value)
                        }}
                        className='form-control'
                    />
                </div>
                <br/>
                <button className='btn btn-primary'>Submit</button>

            </form>
        </div>
    )
}
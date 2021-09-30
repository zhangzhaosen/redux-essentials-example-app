import { getByTitle } from "@testing-library/dom";
import React, { useState } from "react";


import { useDispatch, useSelector } from "react-redux";


import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserid] = useState('')

    const users =  useSelector(state => state.users)
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onAuthorChanged = e=>setUserid(e.target.value)

    const dispatch = useDispatch();

    const  canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const onSavePostClicked = ()=>{
        if(title && content){
            dispatch(
                postAdded(
                   
                    title, 
                    content, 
                    userId, 
                   
                )
            )
            setTitle('')
            setContent('')
        }
    }

    const usersOptions = users.map(user=>(
      <option key = {user.id} value={user.id}>
          {user.name}
      </option>  
    ))
    return (
        <section>
            <h2>Add a new Post</h2>
            <form>
                <label htmlFor="postTile">Post Title: </label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author: </label>
                <select id = "postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Post content: </label>
                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}

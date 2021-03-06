import { getByTitle } from "@testing-library/dom";
import React, { useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import { useAddNewPostMutation } from "../api/apiSlice";
import { selectAllUsers } from "../users/usersSlice";


import { addNewPost, postAdded } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

   // const [addRequestStatus, setAddRequestStatus] = useState('idle')

    //const users = useSelector(state => state.users)
    const [addNewPost, { isLoading }] = useAddNewPostMutation()

    const users =useSelector(selectAllUsers)
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onAuthorChanged = e => setUserId(e.target.value)

    const dispatch = useDispatch();

    //const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
    const canSave = [title, content, userId].every(Boolean) &&  !isLoading

    const onSavePostClicked = async () => {
        if (canSave) {

            try {
                // setAddRequestStatus('pending')
                // var post = { title, content, user: userId }
                // await dispatch(
                //     // postAdded(

                //     //     title, 
                //     //     content, 
                //     //     userId, 

                //     // )
                //     addNewPost(post)
                // ).unwrap()
                await addNewPost({ title, content, user: userId }).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                
                console.error('failed to save post: ' ,  err)
            } finally {
               // setAddRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
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
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
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

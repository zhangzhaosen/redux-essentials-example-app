import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { client } from '../../api/client';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async initalPost => {
        const response = await client.post('fakeApi/posts', initalPost)
        return response.data;
    }
)


const initialState = {
    posts: [],
    status: 'idle',
    error: null
}
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded: {
        //     reducer(state, action) {
        //         state.posts.push(action.payload)
        //     },
        //     prepare(title, content, userId) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 userId,
        //                 date: new Date().toString()
        //             }
        //         }
        //     }
        // },


        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find(post => post.id == id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) { existingPost.reactions[reaction]++ }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'        // Add any fetched posts to the array        
            state.posts = state.posts.concat(action.payload)
        }).addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }).addCase(addNewPost.fulfilled, (state, action) => {
            // We can directly add the new post object to our posts array      
            state.posts.push(action.payload)
        })
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts;

export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id == postId)



import { createSlice } from '@reduxjs/toolkit'

import { nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
    {
        id: '1', title: 'First Post!', content: 'Hello!', userId: "1", date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        }
    },
    {
        id: '2', title: 'Second Post', content: 'More text', userId: "2", date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        }
    }
]
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toString()
                    }
                }
            }
        },


        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id == id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) { existingPost.reactions[reaction]++ }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer
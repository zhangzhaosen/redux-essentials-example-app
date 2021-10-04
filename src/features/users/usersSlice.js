import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

import { createSelector } from 'reselect'
import { selectAllPosts } from '../posts/postsSlice'

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

// const initialState = [
//     { id: '0', name: 'Tianna Jenkins' },
//     { id: '1', name: 'Kevin Grant' },
//     { id: '2', name: 'Madison Price' }
// ]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            //return action.payload
            usersAdapter.setAll(state, action)

        })
    }
})

// export const selectAllUsers = state => state.users

// export const selectUserById = (state, userId) =>
//     state.users.find(user => user.id === userId)


export const { 
    selectAll: selectAllUsers, 
    selectById: selectUserById 
} =  usersAdapter.getSelectors(state => state.users)


export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
)

export default usersSlice.reducer
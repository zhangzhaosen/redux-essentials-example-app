import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({userId}) =>{
    //const author = useSelector(state=>state.users.find(user=>user.id == userId))
    //debugger;
    const author = useSelector(state=>selectUserById(state, userId))
    return <span>{author ? author.name : 'UnKnown author' }</span>
}
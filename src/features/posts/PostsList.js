import React, { useEffect, useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { selectAllPosts, selectPostById, selectPostIds } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { fetchPosts } from './postsSlice'
import { Spinner } from '../../components/Spinner'
import { useGetPostsQuery } from '../api/apiSlice'
import classNames from 'classnames'

export const PostList = () => {

    // const dispatch = useDispatch();

    // //const posts = useSelector(selectAllPosts)
    // //debugger;
    // const orderedPostIds = useSelector(selectPostIds)

    // const postStatus = useSelector(state => state.posts.status)

    // const error = useSelector(state => state.posts.error)

    // useEffect(() => {
    //     if (postStatus == 'idle') {
    //         dispatch(fetchPosts())
    //     }

    // }, [postStatus])

    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        refetch,
        error } = useGetPostsQuery()

    // let PostExcerpt = ({ postId }) => {
    //     const post = useSelector(state => selectPostById(state, postId))
    //     return (<article className="post-excerpt" key={post.id}>
    //         <h3>{post.title}</h3>
    //         <div>
    //             <PostAuthor userId={post.user} />
    //             <TimeAgo timestamp={post.date} />
    //         </div>
    //         <p className="post-content">{post.content.substring(0, 100)}</p>
    //         <ReactionButtons post={post} />
    //         <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
    //     </article>)
    // }

    // PostExcerpt = React.memo(PostExcerpt)


    // let content
    // if (postStatus === 'loading') {
    //     content = <Spinner text="Loading..." />
    // }
    // else if (postStatus === 'succeeded') {    // Sort posts in reverse chronological order by datetime string    
    //     // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    //     // content = orderedPosts.map(post => (<PostExcerpt key={post.id} post={post} />))

    //     content = orderedPostIds.map(postId => (
    //         <PostExcerpt key={postId} postId={postId} />
    //     ))
    // } else if (postStatus === 'failed') {
    //     content = <div>{error}</div>
    // }

    let PostExcerpt = ({ post }) => {

        return (<article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>      <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">        View Post      </Link>    </article>
        )
    }

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()    // Sort posts in descending chronological order    
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
        return sortedPosts
    }, [posts])

    let content

    if (isLoading) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map(post =>
            <PostExcerpt key={post.id} post={post} />
        )
        const containerClassname = classNames('posts-container', {
            disabled: isFetching
        })
        content = <div className={containerClassname}>{renderedPosts}</div>

    } else if (isError) { content = <div>{error.toString()}</div> }

    return (<section className="posts-list">
        <h2>Posts</h2>
        <button onClick={refetch}>Refetch Posts</button>
        {content}
    </section>)
}
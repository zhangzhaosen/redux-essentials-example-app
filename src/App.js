import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddPostForm } from './features/posts/AddPostForm'

import { PostList } from './features/posts/PostsList'
import { SingePostPage } from './features/posts/SinglePostPage'
import {EditPostForm} from './features/posts/EditPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'


function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <React.Fragment>
                                <AddPostForm />
                                <PostList />
                            </React.Fragment>
                        )}
                    />
                    <Route
                        exact
                        path="/posts/:postId"
                        component = {SingePostPage}
                    />
                    <Route
                        exact
                        path="/editPost/:postId"
                        component = {EditPostForm}
                    />
                     <Route exact path="/users" component={UsersList} />          
                     <Route exact path="/users/:userId" component={UserPage} />
                     <Route exact path="/notifications" component={NotificationsList} />

                   
                </Switch>
            </div>
        </Router>
    )
}

export default App

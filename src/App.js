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
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default App

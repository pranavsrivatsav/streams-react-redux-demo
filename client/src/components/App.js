import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import history from '../history'
import StreamList from '../components/Streams/StreamList'
import StreamCreate from '../components/Streams/StreamCreate'
import StreamShow from '../components/Streams/StreamShow'
import StreamEdit from '../components/Streams/StreamEdit'
import StreamDelete from '../components/Streams/StreamDelete'
import Header from './Header'


const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <div>
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams" exact component={StreamList} />
                        <Route path="/streams/new" exact component={StreamCreate} />
                        <Route path="/streams/:id" exact component={StreamShow} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/delete/:id" exact component={StreamDelete} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
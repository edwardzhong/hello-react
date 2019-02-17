import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from './context.js'
import Home from './component/home.js'
import List from './component/list.js'
import '../public/css/index.css'

render(
    <Provider>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/list" component={List} />
                <Route render={() => (<Redirect to="/" />)} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)
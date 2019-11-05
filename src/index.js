import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from './context'
import Home from './page/home'
import List from './page/list'
import '../public/index.css'

render(
    <Provider>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/list" component={List} />
                <Redirect to="/"/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)
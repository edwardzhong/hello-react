import React, { useReducer } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Context from './context.js'
import Home from './component/home.js'
import List from './component/list.js'
import rootReducer from './reducer'
import '../public/css/index.css'

const Root = () => {
    const initState = {
        user: {
            name: 'jeff',
            email: 'jeff@gmail.com'
        },
        list: [
            { id: 1, txt: 'webpack 4' },
            { id: 2, txt: 'react' },
            { id: 3, txt: 'redux' },
        ]
    };
    const [state, dispatch] = useReducer(rootReducer, initState);
    return <Context.Provider value={{ state, dispatch }}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/list" component={List} />
                <Route render={() => (<Redirect to="/" />)} />
            </Switch>
        </Router>
    </Context.Provider>
}
render(
    <Root />,
    document.getElementById('root')
)
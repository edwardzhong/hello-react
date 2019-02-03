import React, { useReducer } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Context from './context'
import Home from './component/home'
import List from './component/list'
import rootReducer from './reducer'

const Root = () => {
    const initState = {
        list:[
            { id: 1, txt: 'webpack' }, 
            { id: 2, txt: 'react' }
        ],
        user:{
            name:'alex',
            email:'alex@gmail.com'
        }
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
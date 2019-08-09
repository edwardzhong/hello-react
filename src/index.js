import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from './context'
import Home from './container/home'
import List from './container/list'
import '../public/index.css'

render(pug`
    Provider
        Router
            Switch
                Route(exact path="/" component=Home)
                Route(exact path="/list" component=List)
                Route(render=() => Redirect(to="/"))
    `,
    document.getElementById('root')
)
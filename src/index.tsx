import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Provider } from './context';
import '../public/index.css';
// import Home from './components/Home'
// import Edit from './components/Edit'
// import List from './components/List'
import PageLoading from './components/PageLoading';

const GlobalStyle = createGlobalStyle`body{ padding:50px;}`;
const Home = lazy(() => import('./components/Home'));
const Edit = lazy(() => import('./components/Edit'));
const List = lazy(() => import('./components/List'));
render(
  <Provider value>
    <GlobalStyle />
    <Router>
      <Switch>
        <Suspense fallback={<PageLoading />}>
          <Route exact path="/" component={Home} />
          <Route exact path="/edit" component={Edit} />
          <Route exact path="/list" component={List} />
          <Redirect to="/" />
        </Suspense>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

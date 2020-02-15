import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from './context';
import PageLoad from './components/Pageload';
import pages from './config/page'
import { createGlobalStyle } from 'styled-components';
import '../public/index.css';

const GlobalStyle = createGlobalStyle`body{ padding:50px;}`;
const lazyComponent = (name: string) => lazy(() => import(`./components/${name}`));

render(
  <Provider value>
    <GlobalStyle />
    <Router>
      <Switch>
        <Suspense fallback={ <PageLoad /> }>
          {
            pages.map((p, i) => <Route
              key={ i }
              exact={ p.exact }
              path={ p.path }
              component={ lazyComponent(p.name) }
            />)
          }
          <Redirect to="/" />
        </Suspense>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

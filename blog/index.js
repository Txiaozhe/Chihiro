import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './src/app/app';

import Home from './src/pages/home';
import Frontend from './src/pages/frontend';
import Backend from './src/pages/backend';
import About from './src/pages/about';

import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';

const router = (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/home" component={Home} />
        <Route path="/frontend" component={Frontend} />
        <Route path="/backend" component={Backend} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
);

ReactDOM.render(router, document.getElementById('root'));

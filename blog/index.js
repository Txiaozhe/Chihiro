import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './src/app/app';

import Home from './src/pages/home';
import Frontend from './src/pages/frontend';
import Backend from './src/pages/backend';
import About from './src/pages/about';
import Detail from './src/pages/blog.detail';

import {Provider} from 'react-redux';
import store from './src/store';
import {screenChange} from './src/actions';

import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';

window.onresize = function() {
  let dynWidth = document.documentElement.clientWidth;
  let dynHeight = document.documentElement.clientHeight;

  store.dispatch(screenChange(dynWidth, dynHeight));
};

const router = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/frontend" component={Frontend}/>
        <Route path="/backend" component={Backend}/>
        <Route path="/about" component={About}/>
        <Route path="/:category/:year/:mon/:day/:title" component={Detail} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));

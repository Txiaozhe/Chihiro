/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd.. Tang Xiaoji
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/08/13        Tang Xiaoji
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from './src/store';
import App from './src/app';

import {Home, Blog, Manage} from './src/pages';

import Frontend from './src/pages/blog/blog.frontend';
import Backend from './src/pages/blog/blog.backend';
import Cloud from './src/pages/blog/blog.cloud';
import Works from './src/pages/blog/blog.works';
import Detail from './src/pages/blog/blog.detail';

import ManageLogin from './src/pages/manage/manage.login';
import ManageEdit from './src/pages/manage/manage.edit';
import MyList from './src/pages/manage/manage.mylist';

import {screenChange} from './src/actions';

import {
  Router,
  Route,
  hashHistory,
  IndexRedirect
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
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/blog" component={Blog}>
          <IndexRedirect to="/blog/frontend" />
          <Route path="/blog/frontend" component={Frontend} />
          <Route path="/blog/backend" component={Backend} />
          <Route path="/blog/cloud" component={Cloud} />
          <Route path="/blog/works" component={Works} />
          <Route path="/blog/:type/:year/:month/:day/:id" component={Detail} />
        </Route>
        <Route path="/manage" component={Manage}>
          <IndexRedirect to="/manage/login" />
          <Route path="/manage/login" component={ManageLogin} />
          <Route path="/manage/edit" component={ManageEdit} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));

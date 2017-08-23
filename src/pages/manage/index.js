/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
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
 *     Initial: 2017/08/14        Tang Xiaoji
 */

'use strict';

import React from 'react';
import {Layout} from 'antd';

import ManageLogin from './manage.login';
import MyList from './manage.mylist';
import ManageEdit from './manage.edit';

import {utils} from '../../utils';
import {route} from '../../config';

import {browserHistory} from 'react-router';

import {connect} from 'react-redux';

class Manage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    utils.extractRoute();
  }

  render() {
    return (
      <Layout>
        {this.props.children}
      </Layout>
    )
  }

  getContent = () => {
    let {loginStatus} = this.props;

    let {scene} = this.props;
    console.log(scene);
    switch (scene.index1) {
      case route.login : {
        if(!loginStatus) {
          browserHistory.push("/#/manage/login");
        }
        browserHistory.push("/#/manage/mylist");
        break;
      }
      case route.edit : {
        browserHistory.push("/#/manage/edit");
        break;
      }
      case route.mylist : {
        browserHistory.push("/#/manage/mylist");
        break;
      }
    }
  }
}

function select(store) {
  return {
    loginStatus: store.admin.loginStatus,
    scene: store.scene.scene
  }
}

export default connect(select) (Manage);

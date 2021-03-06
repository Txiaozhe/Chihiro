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
 *     Initial: 2017/09/13        Tang Xiaoji
 */

'use strict';


import React, {Component} from 'react';
import {Timeline, Icon, Layout, BackTop} from 'antd';
import List from './list';

import {Url, CategoryIndex} from '../../config/index';
import {Http, Time} from '../../utils/index';
import {blog} from '../../config/test';

export default class Backend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    }
  }

  componentDidMount() {
    fetch('./src/blog/backend/list.json').then(res => {
      return res.json();
    }).then(list => {
      this.setState({
        list,
        loading: false
      });
    }).catch(e => {

    })
  }

  render() {
    let {list, loading} = this.state;
    return (
      <List
        loading={loading}
        data={list} />
    );
  }
}

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
import './index.css';
import {Layout, Footer} from 'antd';
import Border from "./border";
import HeaderMenu from "./header.menu";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout style={{
        backgroundColor: '#fff',
        flexDirection: 'row'
      }}>

        <Border/>

        <Layout
          style={{
            alignItems: 'center',
            backgroundColor: '#fff'
          }}>

          <br/>

          <HeaderMenu />

          <br/>

          {this.props.children}

          <div className="footer-time">
            <span> © 2017 ♥ Tang Xiaoji </span>
          </div>
          <br/>
          <div className="footer-power">
            <span>Powered By <a className="footer-a">Txiaozhe</a>  |  Theme - Followed By NexT.Muse</span>
          </div>

          <br/>
        </Layout>

        <Layout
          style={{
            backgroundColor: '#fff'
          }}/>
      </Layout>
    );
  }
}

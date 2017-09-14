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
 *     Initial: 2017/09/14        Tang Xiaoji
 */

'use strict';

import React, {Component} from 'react';
import "./index.css";
import {Layout, Affix, Icon, Popover} from 'antd';

import {connect} from 'react-redux';

class Border extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          height: 600,
          width: 80,
          marginLeft: 60
        }}>

        <Affix offsetTop={50}>
          <Layout style={{
            height: 50,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000'
          }}>
            <span
              style={{
                color: '#fff',
                fontSize: 20
              }}>
              {"Tang Xiaoji ' Blog"}
            </span>
          </Layout>

          <br/>

          <Layout style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff'
          }}>
            <Popover
              content={'GitHub'}>
              <a href="https://github.com/Txiaozhe"><Icon style={{margin: 10, fontSize: 16}} type="github"/></a>
            </Popover>

            <Popover
              content={'Call me'}>
              <a href="/#/about"><Icon style={{margin: 10, fontSize: 16}} type="mobile"/></a>
            </Popover>

            <Popover
              content={'E-mail me'}>
              <a href="mailto:txiaozhe@gmail.com"><Icon style={{margin: 10, fontSize: 16}} type="mail"/></a>
            </Popover>
          </Layout>

          <Layout style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff'
          }}>
            <Layout
              style={{
                alignItems: 'center',
                backgroundColor: '#ffffff'
              }}>
              <span className="number">{"200"}</span>
              <span className="desc">{'Blogs'}</span>
            </Layout>
            <div className="vertical-line"/>
            <Layout
              style={{
                alignItems: 'center',
                backgroundColor: '#ffffff'
              }}>
              <span className="number">{"200"}</span>
              <span className="desc">{'Tags'}</span>
            </Layout>
            <div className="vertical-line"/>
            <Layout
              style={{
                alignItems: 'center',
                backgroundColor: '#ffffff'
              }}>
              <span className="number">{"200"}</span>
              <span className="desc">{'Stars'}</span>
            </Layout>
          </Layout>

          <br/>

          <Layout style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
          }}>
            <Popover
              content={'Source Code'}>
              <a href="https://github.com/Txiaozhe/Chihiro">
                <Icon
                  style={{
                    fontSize: 20
                  }}
                  type="desktop"/>
              </a>
            </Popover>
          </Layout>
        </Affix>
      </Layout>
    )
  }
}

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height,
  }
}

export default connect(select) (Border);

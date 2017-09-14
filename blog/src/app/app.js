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
import {Row, Col, Layout, Icon, Menu} from 'antd';

const menu = [
  {
    key: 'home',
    icon: 'home',
    title: 'Home'
  },
  {
    key: 'frontend',
    icon: 'home',
    title: 'Frontend'
  },
  {
    key: 'backend',
    icon: 'home',
    title: 'Backend'
  },
  {
    key: 'about',
    icon: 'home',
    title: 'About'
  }
];

const coin = [
  {
    key: 'github',
    icon: 'github'
  },
  {
    key: 'mail',
    icon: 'mail'
  },
  {
    key: 'tag',
    icon: 'tag'
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMenuKey: null,
    };
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      selectMenuKey: e.key,
    });

    setTimeout(() => {
      this.setState({
        selectMenuKey: null,
      });
    }, 300);
  };

  render() {
    return (
      <Layout style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>

        <br/>

        <Layout style={{
          height: 50,
          width: 150,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000'
        }}>
          <span
            style={{
              color: '#fff',
              fontSize: 20
            }}>
            {'我的博客'}
          </span>
        </Layout>

        <Row
          gutter={24}>

          <Col>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.selectMenuKey]}
              mode="horizontal">
              {
                menu.map((ele) => {
                  return (
                    <Menu.Item
                      style={{borderColor: this.state.selectMenuKey === ele.key ? '#000' : '#fff'}}
                      key={ele.key}>
                      <a href={`http://127.0.0.1:8000/#/${ele.key}`}>
                        <Icon style={{color: '#000'}} type={ele.icon}/>
                        <span style={{color: '#000'}}>{ele.title}</span>
                      </a>
                    </Menu.Item>
                  );
                })
              }
            </Menu>
          </Col>
        </Row>

        <br/>
        <Row>
          <Col>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.selectMenuKey]}
              mode="horizontal">
              {
                coin.map((ele) => {
                  return (
                    <Menu.Item
                      style={{borderColor: '#fff'}}
                      key={ele.key}>
                      <a href={`http://127.0.0.1:8000/#/${ele.key}`}>
                        <Icon style={{color: '#000', fontSize: 16}} type={ele.icon}/>
                      </a>
                    </Menu.Item>
                  );
                })
              }
            </Menu>
          </Col>
        </Row>

        {this.props.children}
      </Layout>
    );
  }
}

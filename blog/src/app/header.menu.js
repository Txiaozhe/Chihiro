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
import {Icon, Col, Row, Menu} from 'antd';

import {Color} from '../res';

const menu = [
  {
    key: 'home',
    icon: 'home',
    title: 'Home'
  },
  {
    key: 'backend',
    icon: 'api',
    title: 'Backend'
  },
  {
    key: 'frontend',
    icon: 'rocket',
    title: 'Frontend'
  },
  {
    key: 'translate',
    icon: 'book',
    title: 'Translate'
  },
  {
    key: 'about',
    icon: 'smile-o',
    title: 'About'
  }
];

export default class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMenuKey: null
    };
  }

  handleClick = (e) => {
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
                    style={{borderColor: this.state.selectMenuKey === ele.key ? Color.black : Color.white}}
                    key={ele.key}>
                    <a href={`/#/${ele.key}`}>
                      <Icon style={{color: Color.favouriteBlack}} type={ele.icon}/>
                      <span style={{color: Color.favouriteBlack}}>{ele.title}</span>
                    </a>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Col>
      </Row>
    );
  }
}

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
import {Menu, Icon, Layout} from 'antd';

import {menu} from './blog.menu';
import Frontend from './blog.frontend';
import Backend from './blog.backend';
import Cloud from './blog.cloud';
import Works from './blog.works';
import {dimension, color} from '../../resource';

import {connect} from 'react-redux';
import {selectBlogTab} from '../../actions';
import {route} from "../../config";

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBlogClick = (m) => {
    this.props.dispatch(selectBlogTab(m.key));
  };

  render() {
    let {tab} = this.props;
    return (
      <Layout style={innerStyles.container}>
        <Menu
          onClick={this.handleBlogClick}
          selectedKeys={[tab]}
          style={innerStyles.menu}
          mode="horizontal">
          {
            menu.map((m) => {
              return (
                <Menu.Item key={m.route}>
                  <Icon
                    type={m.icon}
                    style={innerStyles.menuIcon} />
                  <span style={innerStyles.menuTitle}>{m.title}</span>
                </Menu.Item>
              )
            })
          }
        </Menu>

        <Layout
          style={innerStyles.bodyLayout}>
          {this.renderBody(tab)}
        </Layout>
      </Layout>
    )
  }

  renderBody = (tab) => {
    switch (tab) {
      case route.frontend: {
        return <Frontend/>
      }
      case route.backend: {
        return <Backend/>
      }
      case route.cloud: {
        return <Cloud/>
      }
      case route.works: {
        return <Works/>
      }
    }
  }
}

const innerStyles = {
  container: {
    backgroundColor: color.white
  },

  menu: {
    width: dimension.blogMenuWidth,
    backgroundColor: color.white
  },

  menuIcon: {
    fontSize: 14
  },

  menuTitle: {
    fontSize: 14
  },

  bodyLayout: {
    backgroundColor: color.white
  }
};

export default connect()(Blog);

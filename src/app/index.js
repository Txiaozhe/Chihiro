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
 *     Initial: 2017/08/13        Tang Xiaoji
 */

'use strict';

import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import './index.less'

const {Content, Sider} = Layout;

import {menu} from './app.menu';
import {color, image} from '../resource';

import {Blog, Manage} from '../pages';

import {connect} from 'react-redux';
import {selectTab} from '../actions';
import route from "../config/route";
import background from '../../images/blog_side.jpg';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMenuClick = (tab) => {
    this.props.dispatch(selectTab(tab.key));
  };

  render() {
    let {selectedTab, selectedBlogTab, width, height} = this.props;
    return (
      <Layout style={{backgroundColor: color.white}}>
        <Sider
          style={{
            height: height
          }}
          collapsed>
          <Menu
            theme="light"
            onClick={this.handleMenuClick}
            style={{
              height: height * 0.93
            }}
            selectedKeys={[selectedTab]}
            mode="inline">
            {
              menu.list.map((m) => {
                return (
                  <Menu.Item key={m.route}>
                    <Icon
                      style={innerStyles.menuIcon}
                      type={m.icon}/>
                    <span
                      style={innerStyles.menuTitle}>{m.title}</span>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>

        <Layout style={{
          backgroundColor: color.white,
          marginLeft: width > 470 ? 12 : 8,
          height: height
        }}>
          <Content>
            {this.renderContent(selectedTab)}
          </Content>
        </Layout>

        {
          selectedTab === route.blog && selectedBlogTab !== route.works && width > 470 ? (
            <Layout
              style={{
                width: width * 0.25,
                height: height,
                backgroundImage: `url(${background})`
              }}>
              <img
                width={80}
                height={80}
                style={{
                  borderRadius: 80,
                  marginLeft: width * 0.25 / 2,
                  marginTop: height * 0.6
                }}
                src={image.user} />

              <span style={{
                width: 80,
                textAlign: 'center',
                marginLeft: width * 0.25 / 2,
                marginTop: 10,
                color: color.white,
                fontSize: 20
              }}>{'唐小吉'}</span>

              <span style={{
                width: 80,
                textAlign: 'center',
                marginLeft: width * 0.25 / 2,
                marginTop: 10,
                color: color.white,
                fontSize: 16
              }}>{'技术宅'}</span>
            </Layout>
          ) : null
        }
      </Layout>
    );
  }

  renderContent = (tab, t) => {
    switch (tab) {
      case route.home: {
        return;
      }
      case route.myFocus : {
        return;
      }
      case route.blog: {
        const {selectedBlogTab} = this.props;
        return <Blog tab={selectedBlogTab}/>;
      }
      case route.manage : {
        return <Manage/>;
      }
    }
  }
}

const innerStyles = {
  menuIcon: {
    fontSize: 18
  },

  menuTitle: {
    fontSize: 16
  }
};

function select(store) {
  return {
    selectedTab: store.navigator.selectedTab,
    selectedBlogTab: store.navigator.selectedBlogTab,
    width: store.screen.width,
    height: store.screen.height
  }
}

export default connect(select)(App);

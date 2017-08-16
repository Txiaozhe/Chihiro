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
import {Layout, Menu, Breadcrumb, Icon, Badge} from 'antd';

const {Content, Sider} = Layout;

import {menu} from './app.menu';
import {dimension, color, image} from '../resource';
import {grade} from '../config/index';

import {Blog, Manage} from '../pages';

import {connect} from 'react-redux';
import {selectTab} from '../actions/index';
import route from "../config/route";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMenuClick = (tab) => {
    this.props.dispatch(selectTab(tab.key));
  };

  render() {
    let {selectedTab, selectedBlogTab} = this.props;
    let gra = grade[selectedTab];
    return (
      <Layout>
        <Layout>
          <Sider
            collapsed>
            <Menu
              theme="light"
              onClick={this.handleMenuClick}
              style={innerStyles.menu}
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

              <Layout style={{marginTop: dimension.githubIconMarginTop}}/>

              <Menu.Item key={menu.github.route}>
                <a href="https://github.com/Txiaozhe">
                  <Icon
                    style={innerStyles.menuIcon}
                    type={menu.github.icon}/>
                  <span
                    style={innerStyles.menuTitle}>{menu.github.title}</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout style={innerStyles.contentLayout}>
            <Content style={{margin: '0 16px'}}>
              {this.renderContent(selectedTab)}
            </Content>
          </Layout>

          {
            selectedTab === route.blog && selectedBlogTab !== route.works ? (
              <Layout
                style={innerStyles.card}>
                <img
                  height={dimension.blogCardHeight}
                  src={image.glass}/>
                <img
                  width={dimension.userImageWidth}
                  height={dimension.userImageWidth}
                  style={innerStyles.userImage}
                  src={image.user}/>
                <span style={innerStyles.userDesc}>wdnmwedmn,ew</span>
              </Layout>
            ) : null
          }
        </Layout>
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
  menu: {
    height: dimension.menuHeight
  },

  menuIcon: {
    fontSize: 18
  },

  menuTitle: {
    fontSize: 16
  },

  card: {
    width: dimension.blogCardWidth,
    height: dimension.blogCardHeight
  },

  contentLayout: {
    height: dimension.bodyHeight,
    width: dimension.bodyWidth,
    backgroundColor: color.white
  },

  userImage: {
    position: 'absolute',
    top: dimension.bodyHeight / 3,
    right: dimension.userImageMarginRight,
    borderRadius: dimension.userImageWidth
  },

  userDesc: {
    position: 'absolute',
    top: dimension.bodyHeight / 3,
    right: dimension.userImageMarginRight,
    backgroundColor: '#f000'
  }
};

function select(store) {
  return {
    selectedTab: store.navigator.selectedTab,
    selectedBlogTab: store.navigator.selectedBlogTab
  }
}

export default connect(select)(App);

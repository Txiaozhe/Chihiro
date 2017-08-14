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
import {Layout, Menu, Breadcrumb, Icon} from 'antd';

const {Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

import {menu} from './app.menu';
import {dimension} from '../resource/index';
import {grade} from '../config/index';
import MyHeader from './app.header';
import MyFooter from './app.footer';

import {Blog} from '../pages';

import {connect} from 'react-redux';
import {selectTab} from '../actions/index';
import route from "../config/route";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({collapsed});
  };

  handleMenuClick = (tab) => {
    this.props.dispatch(selectTab(tab.key));
  };

  render() {
    let {selectedTab} = this.props;
    let gra = grade[selectedTab];
    return (
      <Layout>
        <MyHeader />
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}>
            <Menu
              theme="light"
              onClick={this.handleMenuClick}
              style={innerStyle.menu}
              defaultOpenKeys={[gra.route1]}
              defaultSelectedKeys={[gra.route2 && gra.route2]}
              mode="inline">
              {
                menu.map((m) => {
                  return (
                    <SubMenu
                      key={m.route}
                      title={<span><Icon type={m.icon} /><span>{m.title}</span></span>}>
                      {
                        m.grade.map((g) => {
                          return (
                            <Menu.Item key={g.route}>
                              {<span><Icon type={g.icon} /><span>{g.title}</span></span>}
                            </Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                })
              }
            </Menu>
          </Sider>

          <Layout style={innerStyle.contentLayout}>
            <Content style={{margin: '0 16px'}}>
              <Breadcrumb
                separator={'>'}
                style={{margin: '12px 0'}}>

                <Breadcrumb.Item>
                  <Icon
                    style={innerStyle.breadcrumd}
                    type={gra.icon1} />
                  {gra.title1}
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <Icon
                    style={innerStyle.breadcrumd}
                    type={gra.icon2 && gra.icon2} />
                  {gra.title2 && gra.title2}
                </Breadcrumb.Item>
              </Breadcrumb>

              {this.renderContent(selectedTab)}
            </Content>

            <MyFooter />
          </Layout>
        </Layout>
      </Layout>
    );
  }

  renderContent = (tab) => {
    switch (tab) {
      case route.myFocus : {
        return <Blog />;
      }
      case route.frontend : {

        return;
      }
      case route.backend : {

        return;
      }
      case route.cloud : {

        return;
      }
      case route.works : {

        return;
      }
    }
  }
}

const innerStyle = {
  menu: {
    height: dimension.menuHeight
  },

  contentLayout: {
    height: dimension.bodyHeight
  },

  breadcrumd: {
    marginRight: 10
  }
};

function select(store) {
  return {
    selectedTab: store.navigator.selectedTab
  }
}

export default connect(select) (App);

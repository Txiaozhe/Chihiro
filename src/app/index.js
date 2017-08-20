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

const {Content, Sider} = Layout;

import {menu} from './app.menu';
import {color, image, dimension} from '../resource';

import {Home, Blog, Manage} from '../pages';
import {Link} from "react-router";

import {checkLoginStatus} from '../service';
import {connect} from 'react-redux';
import {sceneChange} from '../actions';
import route from "../config/route";
import background from '../../images/lonely.jpg';

import store from '../store';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {token} = this.props;
    console.log('token: ', token);
    console.log(store.getState().admin.token);
    checkLoginStatus(token);
  }

  handleMenuClick = (tab) => {
    this.props.dispatch(sceneChange({index0: tab.key, index1: ''}));
  };

  render() {
    let {scene, width, height} = this.props;
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
              height: height,
              backgroundColor: color.mainDark
            }}
            selectedKeys={[scene.index0]}
            mode="inline">
            {
              menu.list.map((m) => {
                return (
                  <Menu.Item
                    style={{backgroundColor: scene.index0 === m.route ? color.mainColor : color.mainDark}}
                    key={m.route}>
                    <Link
                      href={`http://127.0.0.1:8000/#/${scene.index0}`}>
                      <Icon
                        style={{
                          fontSize: 18,
                          color: color.white
                        }}
                        type={m.icon}/>
                      <span
                        style={{
                          fontSize: 16,
                          color: color.white
                        }}>{m.title}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>

        <Layout style={{
          backgroundColor: color.white,
          marginLeft: width > dimension.critical_menu_width ? 12 : 8,
          height: height
        }}>
          <Content>
            {this.props.children}
          </Content>
        </Layout>

        {
          scene.index0 === route.blog && scene.index1 !== route.works && width > dimension.critical_menu_width ? (
            <Layout
              style={{
                width: width * 0.2,
                height: height,
                paddingTop: height * 0.55,
                alignItems: 'center',
                backgroundImage: `url(${background})`
              }}>
              <img
                width={80}
                height={80}
                style={{
                  borderRadius: 80
                }}
                src={image.user}/>

              <span style={{
                width: 80,
                textAlign: 'center',
                color: color.white,
                fontSize: 20
              }}>{'唐小吉'}</span>

              <span style={{
                width: 80,
                textAlign: 'center',
                color: color.white,
                fontSize: 16
              }}>{'技术宅'}</span>
            </Layout>
          ) : null
        }
      </Layout>
    );
  }

  renderContent = (tab) => {
    switch (tab) {
      case route.home: {
        return <Home/>;
      }
      case route.blog: {
        return <Blog />;
      }
      case route.manage : {
        return <Manage/>;
      }
    }
  }
}

function select(store) {
  return {
    scene: store.scene.scene,
    width: store.screen.width,
    height: store.screen.height,
    token: store.admin.token
  }
}

export default connect(select)(App);

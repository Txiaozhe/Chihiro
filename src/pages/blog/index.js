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
import {Link} from 'react-router';
import {menu} from './blog.menu';
import Frontend from './blog.frontend';
import Backend from './blog.backend';
import Cloud from './blog.cloud';
import Works from './blog.works';
import {color, dimension} from '../../resource';
import {utils} from '../../utils';

import {connect} from 'react-redux';
import {selectBlogTab} from '../../actions';
import {route} from "../../config";

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    utils.extractRoute();
  }

  handleBlogClick = (m) => {
    this.props.dispatch(selectBlogTab(m));
  };

  render() {
    let {selectedBlogTab, width, height} = this.props;
    return (
      <Layout style={{
        width: width * 0.6,
        backgroundColor: color.white,
        flexDirection: width < dimension.critical_menu_width ? 'row' : 'column'
      }}>
        <Menu
          selectedKeys={[selectedBlogTab]}
          style={{
            width: width < dimension.critical_menu_width ? 120 : dimension.critical_menu_width,
            backgroundColor: color.white
          }}
          mode={width < dimension.critical_menu_width ? "vertical" : "horizontal"}>
          {
            menu.map((m) => {
              return (
                <Menu.Item
                  style={{borderColor: selectedBlogTab === m.route ? color.mainDark : color.mainGrey}}
                  key={m.route}>
                  <Link
                    onClick={() => this.handleBlogClick(m.route)}
                    href={`http://127.0.0.1:8000/#/blog/${selectedBlogTab}`}>
                    <span
                      style={{
                        fontSize: 15,
                        color: selectedBlogTab === m.route ? color.mainDark : color.mainGrey
                      }}>{m.title}
                    </span>
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
        <Layout
          style={innerStyles.bodyLayout}>
          {this.props.children}
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
  menuIcon: {
    fontSize: 15
  },

  bodyLayout: {
    backgroundColor: color.white
  }
};

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height,
    selectedBlogTab: store.scene.selectedBlogTab
  }
}

export default connect(select)(Blog);

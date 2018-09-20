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

import React, { Component } from 'react';
import "./index.css";
import { Layout, Affix, Icon, Popover } from 'antd';
import { Color, String, Icons } from '../res';
import { Url } from '../config';
import { Http } from '../utils';

import { connect } from 'react-redux';

class Border extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: 0,
      visits: 0,
      stars: 0
    }
  }

  componentDidMount() {
    const url = Url.url + Url.getCount.url;
    // Http.get(url, null, (count) => {
    //   if(count.blog) {
    //     this.setState({
    //       blog: count.blog,
    //       visits: count.visits,
    //       stars: count.stars
    //     });
    //   }
    // }, (err) => {
    //
    // });
  }

  render () {
    let { blog, visits, stars } = this.state

    return (
      <Layout
        style={{
          backgroundColor: Color.white,
          alignItems: 'center',
          marginTop: 200,
          height: 600,
          width: 80,
          marginLeft: 60
        }}>

        <Affix offsetTop={100}>
          <Layout style={{
            height: 50,
            width: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.black
          }}>
            <span
              style={{
                color: Color.white,
                fontSize: 20
              }}>
              {String.title}
            </span>
          </Layout>

          <br />

          <Layout style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.white
          }}>
            <Popover
              content={'GitHub'}>
              <a href="https://github.com/Txiaozhe"><Icon className="github" style={{ margin: 10, fontSize: 16 }} type={Icons.github} /></a>
            </Popover>

            <Popover
              content={'NPM'}>
              <img src="/npm.png" className="npm-image" />
            </Popover>

            <Popover
              content={'E-mail'}>
              <a href="/#/about"><Icon className="mail" style={{ margin: 10, fontSize: 16 }} type={Icons.mail} /></a>
            </Popover>
          </Layout>

          <Layout style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.white
          }}>
            <Layout
              style={{
                alignItems: 'center',
                backgroundColor: Color.white
              }}>
              <span className="number">{blog}</span>
              <span className="desc">{String.count_blog}</span>
            </Layout>
            <div className="vertical-line" />
            <Layout
              style={{
                alignItems: 'center',
                backgroundColor: Color.white
              }}>
              <span className="number">{visits}</span>
              <span className="desc">{String.count_visit}</span>
            </Layout>
            <div className="vertical-line" />
            <Layout
              style={{
                alignItems: 'center',
                backgroundColor: Color.white
              }}>
              <span className="number">{stars}</span>
              <span className="desc">{String.count_star}</span>
            </Layout>
          </Layout>

          <br />

          <Layout style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.white,
            flexDirection: 'row'
          }}>
            <Popover
              content={'Source Code'}>
              <a href="https://github.com/Txiaozhe/Chihiro">
                <Icon
                  style={{
                    fontSize: 20,
                    padding: 10
                  }}
                  type={Icons.desktop} />
              </a>
            </Popover>

            <Popover
              content={'CockroachDB'}>
              <a href="http://cockroach.txiaozhe.top">
                <Icon
                  style={{
                    fontSize: 19,
                    padding: 10,
                    paddingBottom: 12
                  }}
                  type={Icons.database} />
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
    height: store.screen.height
  }
}

export default connect(select)(Border)

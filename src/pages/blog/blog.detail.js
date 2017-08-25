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
import './index.less';
import {Layout, Spin} from 'antd';
import {url} from '../../config';
import {utils, http, time} from '../../utils';
import {color} from '../../resource';
import ReactMarkdown from 'react-markdown';

import {connect} from 'react-redux';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      loading: true
    }
  }

  componentDidMount() {
    let {id} = this.props.params;
    let u = url.host + url.version + url.getGithubBlogDetail.url;
    http.post(u, null, {
      "number": id
    }, (json) => {
      this.setState({
        detail: json,
        loading: false
      });
    }, (e) => {
      console.log(e);
    });

    utils.extractRoute();
  }

  render() {
    let {width, height} = this.props;
    let {detail, loading} = this.state;
    return (
      <Layout>
        {
          loading ? (
            <Spin
              color={color.mainColor}
              style={innerStyle.spin}/>
          ) : (
            <Layout
              style={{
                backgroundColor: color.white
              }}>
              <span style={{
                fontSize: 30,
                fontWeight: 'bold'
              }}>{detail && detail.title}</span>

              <Layout
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#0ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width * 0.3,
                  height: 30
                }}>

                <span style={{
                  fontSize: 20
                }}>{time.getDate(detail && detail.updated_at)}
                </span>

                <Layout
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#ff0',
                    marginTop: 8,
                    height: 30
                  }}>
                  {
                    detail && detail.labels.map((ele, i) => {
                      return (
                        <span
                          key={i}
                          style={{
                            marginLeft: i === 0 ? 10 : 8,
                            paddingTop: 1,
                            paddingBottom: 1,
                            paddingLeft: 4,
                            paddingRight: 4,
                            borderRadius: 4,
                            height: 20,
                            color: color.white,
                            backgroundColor: `#${ele.color}`
                          }}>{ele.name}</span>
                      );
                    })
                  }
                </Layout>
              </Layout>

              <ReactMarkdown
                className="markdown"
                source={detail && detail.body}/>
            </Layout>
          )
        }
      </Layout>
    )
  }
}

const innerStyle = {
  spin: {
    backgroundColor: color.white,
    paddingTop: 20,
    paddingBottom: 20
  }
};

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height
  }
}

export default connect(select)(Detail);

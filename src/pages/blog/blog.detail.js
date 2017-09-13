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
import {Layout, Spin, Icon} from 'antd';
import {service} from '../../service';
import {utils, http, time} from '../../utils';
import {color} from '../../resource';
import ReactMarkdown from 'react-markdown';

import {connect} from 'react-redux';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: "",
      loading: true
    }
  }

  componentDidMount() {
    let {contentid} = this.props.location.state;
    service.getDetail(contentid, (det) => {
      this.setState({
        detail: det,
        loading: false
      });
    }, () => {
      this.setState({
        loading: false
      });
    });

    utils.extractRoute();
  }

  render() {
    let {year, month, day} = this.props.params;
    let {width, height} = this.props;
    let {title, tag} = this.props.location.state;
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
              }}>{title}</span>

              <Layout
                style={{
                  flexDirection: 'row',
                  backgroundColor: color.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width * 0.3,
                  height: 30
                }}>

                <span style={{
                  fontSize: 18
                }}>{`${year}-${month}-${day}`}
                </span>

                <Layout style={innerStyle.tagLayout}>
                  <Icon
                    type="tags-o"
                    style={innerStyle.tagIcon}/>
                  {
                    <span style={{
                      marginLeft: 10,
                      fontSize: 18
                    }}>{tag.split(',').join(', ')}</span>
                  }
                </Layout>
              </Layout>

              <ReactMarkdown
                className="markdown"
                source={detail}/>
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
  },

  tagLayout: {
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5
  },

  tagIcon: {
    fontSize: 18,
    color: color.mainColor
  }
};

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height
  }
}

export default connect(select)(Detail);

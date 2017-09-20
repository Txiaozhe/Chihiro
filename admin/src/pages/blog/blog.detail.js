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
import {Layout, Spin, Icon, Button} from 'antd';
import {service} from '../../service';
import {utils, http, time, storage} from '../../utils';
import {route} from '../../config';
import {color} from '../../resource';
import ReactMarkdown from 'react-markdown';

import {connect} from 'react-redux';
import {selectTab, selectBlog} from '../../actions';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: "",
      loading: true
    }
  }

  componentDidMount() {
    let item = storage.getData();
    service.getDetail(item.contentid, (det) => {
      this.setState({
        detail: det,
        loading: false
      });
    }, (err) => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    let {title, abstract, category, tag, star, created} = storage.getData();

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
              <Layout style={{backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center'}}>
                <span style={{
                  fontSize: 30,
                  fontWeight: 'bold'
                }}>{title}</span>

                <Button
                  onClick={this.onModify}
                  style={{marginLeft: 20}}><Icon type="edit" />编辑</Button>
              </Layout>

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
                }}>{time.getDate(created)}</span>

                <Layout style={innerStyle.tagLayout}>
                  <Icon
                    type="tags-o"
                    style={innerStyle.tagIcon}/>
                  {
                    <span style={{
                      marginLeft: 10,
                      fontSize: 18
                    }}>{tag.split(',').join('，')}</span>
                  }
                </Layout>
              </Layout>

              <ReactMarkdown
                className="markdownWrapper"
                source={detail}/>
            </Layout>
          )
        }
      </Layout>
    )
  }

  onModify = () => {
    let {detail} = this.state;
    this.props.dispatch(selectTab(route.modify));
    storage.setContent(detail);
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

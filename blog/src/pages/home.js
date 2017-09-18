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
 *     Initial: 2017/09/13        Tang Xiaoji
 */

'use strict';

import React, {Component} from 'react';
import {Timeline, Icon, Layout, BackTop, Input, Avatar, Button} from 'antd';
import Item from './blog.list.item';
import {Url} from '../config';
import {Http} from '../utils';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      writing: false
    }
  }

  componentDidMount() {
    const url = Url.url + Url.getBlogList.url;
    Http.post(url, null, {
      "category": 1
    }, (list) => {
      this.setState({
        list,
        loading: false
      });
    }, (err) => {
      setTimeout(() => {
        this.setState({
          loading: false
        });
      });
    });
  }

  render() {
    let {list, loading, writing} = this.state;
    return (
      <div
        className="list">
        {
          loading ? (
            <Layout
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
              }}>
              <Icon
                type="loading"
                className="spinner"/>
            </Layout>
          ) : (
            <Timeline>
              <BackTop/>
              {
                list.map((ele, i) => {
                  return (
                    <Item
                      key={i}
                      title={ele.title}
                      category={'home'}
                      contentid={ele.contentid}
                      created={ele.created}
                      tags={ele.tag.split(',').join('，')}
                      abstract={ele.abstract}/>
                  )
                })
              }
            </Timeline>
          )
        }

        {
          <Layout
            style={{
              backgroundColor: '#f8f9fa',
              padding: 10,
              borderRadius: 4
            }}>

            <Layout style={{flexDirection: 'row', backgroundColor: '#f8f9fa',}}>
              <Avatar style={{ backgroundColor: '#87d068', marginRight: 10 }} icon="user" />
              <Input.TextArea
                style={{
                  fontSize: 15
                }}
                onFocus={() => this.setState({writing: true})}
                onBlur={() => this.setState({writing: false})}
                placeholder="评价一下" autosize={{minRows: 2, maxRows: 6}}/>
            </Layout>

            {
              writing ? (
                <Layout style={{flexDirection: 'row', marginTop: 10, backgroundColor: '#f8f9fa'}}>
                  <Layout style={{flex: 1, backgroundColor: '#f8f9fa'}}/>
                  <Button style={{width: 60}}>提交</Button>
                </Layout>
              ) : null
            }
          </Layout>
        }
      </div>
    );
  }
}

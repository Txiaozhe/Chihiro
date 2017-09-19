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
 *     Initial: 2017/09/19        Tang Xiaoji
 */

'use strict';

import React, {Component} from 'react';
import {Layout, Avatar} from 'antd';
import {Color} from '../../res';
import {Http, Time} from '../../utils';
import {Url} from '../../config';

class Item extends Component {
  render() {
    let {name, content, created, f, avatar} = this.props;

    return (
      <div>
        <Layout style={{justifyContent: 'center', backgroundColor: Color.white, padding: 10}}>
          <Layout style={{backgroundColor: Color.white, flexDirection: 'row', alignItems: 'center'}}>
            <Avatar style={{backgroundColor: avatar, marginRight: 10}}>
              <span style={{fontSize: 16}}>{name.substring(0, 1).toUpperCase()}</span>
            </Avatar>
            <Layout style={{
              backgroundColor: Color.white
            }}>
              <span style={{color: Color.favouriteBlack, fontSize: 16}}>{name}</span>
              <Layout style={{backgroundColor: Color.white, flexDirection: 'row'}}>
                <span style={{color: Color.grey}}>{f + 1} F · </span>
                <span style={{color: Color.grey, marginLeft: 4}}>{Time.getDate(created)}</span>
              </Layout>
            </Layout>
          </Layout>
          <span
            style={{
              fontSize: 16,
              color: Color.favouriteBlack
            }}>{content}</span>
        </Layout>
        <hr color={Color.favouriteGrey}/>
      </div>
    );
  }
}

class BadgeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badgeList: []
    }
  }

  componentDidMount() {
    const {blogid} = this.props;
    const url = Url.url + Url.getBadgeById.url;
    Http.post(url, null, {
      "blogid": blogid
    }, (list) => {
      console.log(list);
      if(list && list.length !== 0) {
        this.setState({
          badgeList: list
        });
      }
    }, (err) => {

    });
  }

  render() {
    let {badgeList} = this.state;

    return (
      <div>
        {
          badgeList.map((ele, i) => {
            return (
              <Item
                key={i}
                f={i}
                name={ele.name}
                avatar={ele.avatar}
                content={ele.content}
                created={ele.created}/>
            )
          })
        }
      </div>
    );
  }
}

export default BadgeList;

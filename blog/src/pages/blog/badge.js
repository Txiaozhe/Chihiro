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
 *     Initial: 2017/09/18        Tang Xiaoji
 */

'use strict';

import React, {Component} from 'react';
import {Layout, Input, Button, Radio, message} from 'antd';
const RadioGroup = Radio.Group;
import {Color, String} from '../../res';
import {Http} from '../../utils';
import {Url} from '../../config';

class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writing: false,
      isAnonymous: 'yes',
      content: '',
      name: ''
    }
  }

  render() {
    let {writing, isAnonymous} = this.state;

    return (
      <Layout
        style={{
          backgroundColor: Color.favouriteGrey,
          padding: 10,
          borderRadius: 4
        }}>

        <Layout style={{flexDirection: 'row', backgroundColor: Color.favouriteGrey,}}>
          <Input.TextArea
            style={{
              fontSize: 15
            }}
            onFocus={() => this.setState({writing: true})}
            onBlur={this.onWriteBlur}
            onChange={(text) => this.setState({content: text.target.value})}
            placeholder={String.badge_placeholder} autosize={{minRows: 2, maxRows: 6}}/>
        </Layout>

        {
          writing ? (
            <Layout style={{flexDirection: 'row', marginTop: 10, backgroundColor: Color.favouriteGrey, alignItems: 'center'}}>
              <Layout style={{flex: 1, backgroundColor: Color.favouriteGrey}}/>
              <RadioGroup
                onChange={this.onChangeAnonymous}
                value={this.state.isAnonymous}>
                <span style={{
                  marginRight: 8,
                  color: Color.favouriteBlack,
                  fontSize: 14
                }}> Be anonymous ?   </span>
                <Radio value={'yes'}>Yes</Radio>
                <Radio value={'no'} style={{
                  marginLeft: 2
                }}>No</Radio>
              </RadioGroup>
              {isAnonymous === 'no' ? <Input
                style={{
                  width: 100
                }}
                onChange={(text) => this.setState({name: text.target.value})}
                placeholder="Your Name" /> : null}
              <Button style={{width: 80, marginLeft: 10}} onClick={this.onSubmit}>{String.badge_submit}</Button>
            </Layout>
          ) : null
        }
      </Layout>
    );
  }

  onWriteBlur = () => {
    let {content} = this.state;
    if(!content) {
      this.setState({writing: false})
    }
  };

  onSubmit = () => {
    let {blogid} = this.props;
    let {content, name} = this.state;
    let avatar = Math.floor(Math.random() * 10);

    const url = Url.url + Url.createBadge.url;
    Http.post(url, null, {
      "blogid": parseInt(blogid),
      "name": name ? name : 'Anonymous',
      "avatar": Color.icons[avatar],
      "content": content
    }, (data) => {
      if(!data) {
        message.info('发布成功！');
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        message.error('发布失败，请检查网络设置！');
      }
    }, (err) => {
      message.error('发布失败，请检查网络设置！');
      console.log(err);
    });
  };

  onChangeAnonymous = (e) => {
    this.setState({
      isAnonymous: e.target.value,
    });
  }
}

export default Badge;

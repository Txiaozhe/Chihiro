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
import {Layout, Input, Avatar, Button} from 'antd';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writing: false,
      message: ''
    }
  }

  render() {
    let {writing} = this.state;

    return (
      <Layout
        style={{
          backgroundColor: '#f8f9fa',
          padding: 8,
          borderRadius: 4
        }}>

        <Layout style={{flexDirection: 'row', backgroundColor: '#f8f9fa',}}>
          <Input.TextArea
            style={{
              fontSize: 12
            }}
            onFocus={() => this.setState({writing: true})}
            onBlur={this.onWriteBlur}
            onChange={(text) => this.setState({message: text.target.value})}
            placeholder="留言" autosize={{minRows: 1, maxRows: 3}}/>
        </Layout>

        {
          writing ? (
            <Layout style={{flexDirection: 'row', marginTop: 6, backgroundColor: '#f8f9fa'}}>
              <Layout style={{flex: 1, backgroundColor: '#f8f9fa'}}/>
              <Button style={{width: 60, height: 24}} onClick={this.onSubmit}>提交</Button>
            </Layout>
          ) : null
        }
      </Layout>
    );
  }

  onWriteBlur = () => {
    let {message} = this.state;
    if(!message) {
      this.setState({writing: false})
    }
  };

  onSubmit = () => {
    let {message} = this.state;
  }
}

export default Message;

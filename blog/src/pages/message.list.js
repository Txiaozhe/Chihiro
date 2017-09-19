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
import {Layout} from 'antd';
import {msgList} from '../config/test';
import './message.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="message-list">
        {
          msgList.map((ele, i) => {
            return (
              <Layout
                style={{
                  height: 50,
                  backgroundColor: '#ffffff',
                  marginTop: 5,
                  justifyContent: 'center'
                }}
                key={i}>
                <span className="message-content">{ele.content}</span>
                <span className="message-time">{ele.created}</span>
              </Layout>
            );
          })
        }
      </div>
    );
  }
}

export default MessageList;

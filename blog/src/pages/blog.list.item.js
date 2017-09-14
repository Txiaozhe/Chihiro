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
import {Layout, Icon, Timeline} from 'antd';
import './item.css';

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {title, abstract, created, tags} = this.props;

    return (
      <Timeline.Item
        className="item-layout"
        dot={
          <Icon
            style={{color: '#000'}}
            type="clock-circle-o"/>
        }>
        <div>
          <span className="item-time">{created}</span>
        </div>

        <br />

        <div>
          <a href="https://baidu.com">{title}</a>
          <Icon className="item-tag-margin" type="tag"/><span className="item-tag">      {tags}</span>
        </div>

        <br />

        <div>
          <span className="item-abstract">{abstract}</span>
        </div>
      </Timeline.Item>
    );
  }
}

export default BlogItem;

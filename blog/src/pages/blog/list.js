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
import './list';
import {Timeline, Icon, Layout, BackTop} from 'antd';
import Item from './blog.list.item';
import {Color} from '../../res';

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {loading, data} = this.props;

    return (
      <div
        className="list">
        {
          loading ? (
            <Layout
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.white
              }}>
              <Icon
                type="loading"
                className="spinner"/>
            </Layout>
          ) : (
            <Timeline>
              <BackTop/>
              {
                data.map((ele, i) => {
                  return (
                    <Item
                      key={i}
                      id={ele.id}
                      title={ele.title}
                      category={ele.category}
                      contentid={ele.contentid}
                      created={ele.created}
                      star={ele.star}
                      tags={ele.tag.split(',').join('，')}
                      abstract={ele.abstract} />
                  )
                })
              }
            </Timeline>
          )
        }
      </div>
    );
  }
}

export default List;

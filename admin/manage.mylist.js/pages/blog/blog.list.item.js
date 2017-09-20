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
import {Layout, Icon} from 'antd';

import {time} from '../../utils';
import {color} from '../../resource';

import {connect} from 'react-redux';
import {selectBlog, selectTab} from '../../actions';

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {id, width, height, item} = this.props;
    let dateObj = time.getDateObj(item.created);
    return (
      <Layout style={{
        height: height * 0.12 < 110 ? 110 : height * 0.12,
        backgroundColor: color.white,
        marginLeft: width < 266 ? 6 : 0,
        marginBottom: 2
      }}>
        <Layout style={innerStyle.headerLayout}>
          <span style={innerStyle.headerAuthor}>{"Txiaozhe"}</span>
          <span style={innerStyle.headerDate}>{time.getDate(item.created)}</span>
        </Layout>
        <a
          onClick={this.onSelectBlogDetail}
          style={innerStyle.title}>
          <h3>{item.title}</h3>
        </a>
        <Layout style={innerStyle.tagLayout}>
          <Icon
            type="tags-o"
            style={innerStyle.tagIcon}/>
          {
            <span>{item.tag}</span>
          }
        </Layout>

        <span style={innerStyle.content}>{item.abstract}</span>

        <Layout style={{height: 1.5}}/>
      </Layout>
    );
  }

  onSelectBlogDetail = () => {
    let {item} = this.props;
    this.props.dispatch(selectTab('detail'));
    this.props.dispatch(selectBlog(item));
  }
}

const innerStyle = {
  headerLayout: {
    backgroundColor: color.white,
    flexDirection: 'row',
    marginTop: 12
  },

  headerAuthor: {},

  headerDate: {
    marginLeft: 8
  },

  title: {
    marginTop: 4,
    backgroundColor: color.white
  },

  tagLayout: {
    backgroundColor: color.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },

  tagIcon: {
    fontSize: 18,
    color: color.mainColor
  },

  content: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: color.white
  }
};

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height
  }
}

export default connect(select)(BlogItem);

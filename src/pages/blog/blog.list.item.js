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

import {color} from '../../resource';

import {connect} from 'react-redux';

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {id, width, height} = this.props;

    return (
      <Layout style={{
        height: height * 0.12 < 110 ? 110 : height * 0.12,
        backgroundColor: color.white,
        marginLeft: width < 470 ? 6 : 0,
        marginBottom: 2
      }}>
        <Layout style={innerStyle.headerLayout}>
          <span style={innerStyle.headerAuthor}>Txiaozhe</span>
          <span style={innerStyle.headerDate}>2017-08-14</span>
        </Layout>
        <a
          style={innerStyle.title}
          onClick={() => this.onBlogDetail(id)}>
          <h3>说一说 GitHub</h3>
        </a>
        <Layout style={innerStyle.tagLayout}>
          <Icon
            type="tags-o"
            style={innerStyle.tagIcon}/>
          <span style={innerStyle.tagTags}>GitHub、Blog</span>
        </Layout>

        <span style={innerStyle.content}>{'常常幻想自己是一个画家，然并不喜欢作画。所以作为非资深专业设计师，想来写一写sketch和zeplin的上手心得'}</span>

        <Layout style={{height: 1.5}}/>
      </Layout>
    );
  }

  onBlogDetail = (id) => {
    console.log(id);
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
    color: '#08c'
  },

  tagTags: {
    marginLeft: 8
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

export default connect(select) (BlogItem);

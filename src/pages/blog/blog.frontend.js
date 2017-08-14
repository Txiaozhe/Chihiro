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
import MyFooter from '../../app/app.footer';

const {Content} = Layout;
import {dimension, color, image} from '../../resource';

class BlogItem extends React.Component {
  render() {
    return (
      <Layout style={innerStyle.itemContainer}>
        <img src={image.flower} style={innerStyle.img} />
        <Layout style={innerStyle.layout}>
          <Layout style={innerStyle.headerLayout}>
            <span style={innerStyle.headerAuthor}>Txiaozhe</span>
            <span style={innerStyle.headerDate}>2017-08-14</span>
          </Layout>
          <h3 style={innerStyle.title}>说一说GitHub</h3>
          <Layout style={innerStyle.tagLayout}>
            <Icon
              type="tags-o"
              style={innerStyle.tagIcon}/>
            <span style={innerStyle.tagTags}>GitHub</span>
            <span style={innerStyle.tagTags}>Blog</span>
          </Layout>

          <span style={innerStyle.content}>{'常常幻想自己是一个画家，然并不喜欢作画。所以作为非资深专业设计师，想来写一写sketch和zeplin的上手心得'}</span>
        </Layout>
      </Layout>
    );
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Frontend extends React.Component {
  render() {
    return (
      <Layout
        style={innerStyle.container}>
        {
          arr.map(() => {
            return (
              <BlogItem/>
            )
          })
        }
        <MyFooter/>
      </Layout>
    )
  }
}

const innerStyle = {
  container: {
    marginTop: 4,
    marginLeft: 4,
    width: dimension.frontBodyWidth,
  },

  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
    height: dimension.blogImageHeight
  },

  layout: {
    backgroundColor: color.white
  },

  img: {
    width: dimension.blogImageWidth,
    height: dimension.blogImageHeight
  },

  headerLayout: {
    backgroundColor: color.white,
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8
  },

  headerAuthor: {},

  headerDate: {
    marginLeft: 8
  },

  title: {
    marginTop: 8,
    marginLeft: 8
  },

  tagLayout: {
    backgroundColor: color.white,
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8,
    alignItems: 'center'
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
    marginLeft: 8,
    marginBottom: 8
  }
};

export default Frontend;

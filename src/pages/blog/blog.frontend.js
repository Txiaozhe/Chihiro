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

import {Layout, Icon, Spin} from 'antd';
import MyFooter from '../../app/app.footer';
import BlogItem from './blog.list.item';

import {dimension} from '../../resource';
import color from "../../resource/color";

const arr = [1, 2];

class Frontend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 2000);
  }

  render() {
    let {loading} = this.state;
    return (
      <Layout
        style={innerStyle.container}>
        {loading ? <Spin style={innerStyle.spin} /> : (
          arr.map((ele, i) => {
            return (
              <BlogItem
                key={i}
                id={i} />
            )
          })
        )}
        <MyFooter />
      </Layout>
    )
  }
}

const innerStyle = {
  container: {
    width: dimension.frontBodyWidth,
    marginLeft: 8
  },

  spin: {
    backgroundColor: color.white,
    paddingTop: 20,
    paddingBottom: 20
  }
};

export default Frontend;

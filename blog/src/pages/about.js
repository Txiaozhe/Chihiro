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
 *     Initial: 2017/09/13        Tang Xiaoji
 */

'use strict';

import React, {Component} from 'react';
import {Layout} from 'antd';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout
        style={styles.container}>

        <img
          className="about-image"
          src="../../image/leaf.jpg"/>

        <span className="about-content">Hold fast to dreams, </span>
        <span className="about-content">For if dreams die, </span>
        <span className="about-content">Life is a broken-winged bird, </span>
        <span className="about-content">That can never fly. </span>
        <span className="about-content">Hold fast to dreams, </span>
        <span className="about-content">For when dreams go, </span>
        <span className="about-content">Life is a barren field, </span>
        <span className="about-content">Frozen only with snow. </span>
        <br/>
        <span className="about-contact">WeChat: txj1269179099</span>
        <span className="about-contact">E-mail: txiaozhe@gmail.com</span>
        <br/>
      </Layout>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
};

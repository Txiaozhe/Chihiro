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
import {Layout, Input, Icon} from 'antd';

import {dimension, style, color, image} from '../../resource';
import {msg} from '../../utils';

class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: ''
    }
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <Layout
        style={innerStyles.container}>

        <img
          width={dimension.userImageWidth}
          height={dimension.userImageWidth}
          style={innerStyles.userImage}
          src={image.user} />

        <Input
          style={innerStyles.input}
          onPressEnter={this.onLogin}
          value={this.state.pass}
          type={'password'}
          ref={r => this.input = r}
          size="large"
          onChange={(text) => this.setState({pass: text.target.value})}
          suffix={<a onClick={() => this.setState({pass: ''})}><Icon type="close" /></a>}
          placeholder="please input admin password!" />
      </Layout>
    )
  }

  onLogin = () => {
    msg.showMsg(msg.ERROR, this.state.pass);
  }
}

const innerStyles = {
  container: {
    width: dimension.manageBodyWidth,
    height: dimension.manageBodyHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white
  },

  userImage: {
    borderRadius: dimension.userImageWidth
  },

  input: {
    marginTop: 40,
    width: dimension.manageInputWidth
  }
};

export default Manage;

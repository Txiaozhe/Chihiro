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

import {Layout, Card, Rate} from 'antd';
import MyFooter from '../../app/app.footer';

import {color} from '../../resource';

import {connect} from 'react-redux';

class WorksItem extends React.Component {
  render() {
    return (
      <Card style={innerStyle.card} bodyStyle={{padding: 0}}>
        <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>

        <Layout style={innerStyle.contentLayout}>
          <a
            style={innerStyle.link}
            href="https://github.com/txiaozhe/iantd"><h3>iantd</h3></a>

          <Rate
            disabled
            style={innerStyle.rate}
            defaultValue={2} />
        </Layout>
      </Card>
    )
  }
}

class Works extends React.Component {
  render() {
    let {width, height} = this.props;
    return (
      <Layout
        style={{
          width: width,
          backgroundColor: color.white,
          marginLeft: 8,
          marginTop: 8
        }}>

        <Layout
          style={{flexDirection: 'row', backgroundColor: color.white}}>
          <WorksItem />
          <WorksItem />
          <WorksItem />
        </Layout>

        <MyFooter/>
      </Layout>
    )
  }
}

const innerStyle = {
  card: {
    width: 240,
    marginTop: 12,
    marginLeft: 12,
    backgroundColor: color.white
  },

  contentLayout: {
    backgroundColor: color.white
  },

  link: {
    marginLeft: 8,
    marginBottom: 8
  }
};

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height
  }
}

export default connect(select) (Works);

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
 *     Initial: 2017/08/20        Tang Xiaoji
 */

'use strict';

import React from 'react';

import {Layout, Spin, Button, Icon, Affix} from 'antd';
import MyFooter from '../../app/app.footer';
import BlogItem from './blog.list.item';
import {utils} from '../../utils';

import color from "../../resource/color";

import {connect} from 'react-redux';
import {sceneChange} from '../../actions';
import route from "../../config/route";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2];

class MyList extends React.Component {
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
    }, 1000);

    utils.extractRoute();
  }

  render() {
    let {loading} = this.state;
    let {width, height} = this.props;
    return (
      <Layout
        style={{
          width: width,
          backgroundColor: color.white,
          flexDirection: 'row'
        }}>
        <Layout
          style={{
            width: width * 0.6,
            backgroundColor: color.white,
            marginLeft: 10
          }}>
          {loading ? <Spin
            color={color.mainColor}
            style={innerStyle.spin} /> : (
            arr.map((ele, i) => {
              return (
                <BlogItem
                  key={i}
                  id={i} />
              )
            })
          )}
          <MyFooter/>
        </Layout>

        <Layout
          style={{
            backgroundColor: color.white,
            width: width * 0.4,
            height: height,
            justifyContent: 'center',
            alignItems: 'center'
          }}>

          <Button
            type="primary"
            style={{
              width: width * 0.1,
              marginTop: 50
            }}
            onClick={this.onWriteBlog}>
            <a href={`/#/manage/edit`}><Icon type="edit"/>{"写博客"}</a>
          </Button>
        </Layout>
      </Layout>
    )
  }

  onWriteBlog = () => {
    this.props.dispatch(sceneChange({index0: route.manage, index1: route.edit}));
  }
}

const innerStyle = {
  spin: {
    backgroundColor: color.white,
    paddingTop: 20,
    paddingBottom: 20
  }
};

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height
  }
}

export default connect(select)(MyList);

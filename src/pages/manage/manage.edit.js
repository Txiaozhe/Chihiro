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
import './index.less';
import {Layout, Input, Select, Button, Icon} from 'antd';
import ReactMarkdown from 'react-markdown';
import {browserHistory} from 'react-router';

import {route} from '../../config';
import {utils, storage, msg} from '../../utils';
import {color} from '../../resource';
import {category} from './manage.config';

import {connect} from 'react-redux';
import {sceneChange} from '../../actions';

class ManageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      abstract: "",
      tags: [],
      content: ""
    }
  }

  componentDidMount() {
    let data = storage.getData();
    this.setState({
      title: data.title ? data.title : "",
      abstract: data.abstract ? data.abstract : "",
      category: data.category ? data.category : "",
      tags: data.tags ? data.tags : [],
      content: data.content ? data.content : ""
    });

    utils.extractRoute();
  }

  shouldComponentUpdate(nextProps, nextState) {
    storage.saveData(nextState.title, nextState.abstract, nextState.category, nextState.tags, nextState.content);
    return true;
  }

  render() {
    let {width, height} = this.props;
    let data = storage.getData();
    return (
      <Layout
        style={{backgroundColor: color.white}}>
        <Input
          style={{
            width: width * 0.3,
            height: 32,
            marginTop: 10
          }}
          placeholder={'标题 20 字以内'}
          defaultValue={data.title ? data.title : ""}
          onChange={(input) => this.setState({title: input.target.value})}
          size="large" />

        <Input
          style={{
            width: width * 0.6,
            height: 32,
            marginTop: 10
          }}
          placeholder={'摘要 60 字以内'}
          defaultValue={data.abstract ? data.abstract : ""}
          onChange={(input) => this.setState({abstract: input.target.value})}
          size="large" />

        <Layout
          style={{
            flexDirection: 'row',
            width: width * 0.6 * 1.2 - 10,
            height: 32,
            fontSize: 16,
            alignItems: 'center',
            backgroundColor: color.white,
            marginTop: 10
          }}>
          <Select
            style={{
              width: width * 0.6 * 0.1
            }}
            defaultValue={data.category ? data.category : category[0].value}
            onChange={this.onCategorySelect}>
            {
              category.map((ele, i) => {
                return (
                  <Select.Option
                    key={i}
                    value={ele.value}>{ele.title}</Select.Option>
                );
              })
            }
          </Select>

          <Select
            mode="tags"
            style={{
              width: '100%',
              marginLeft: 10
            }}
            defaultValue={data.tags ? data.tags : []}
            placeholder="标签"
            onChange={this.onTagSelect}>
          </Select>

          <Button
            style={{
              width: width * 0.65 * 0.2,
              marginLeft: 10
            }}
            onClick={this.onSubmit}>
            <Icon type="check-circle" />{"提交"}
          </Button>

          <Button
            type="danger"
            style={{
              width: width * 0.65 * 0.2,
              marginLeft: 10
            }}
            onClick={this.onLogout}>
            <Icon type="logout" />{"登出"}
          </Button>
        </Layout>

        <Layout style={{
          width: width,
          height: height - 32 * 3 - 100,
          flexDirection: 'row',
          marginTop: 10,
          backgroundColor: color.white
        }}>
          <Input.TextArea
            defaultValue={data.content ? data.content : ""}
            className="publish-desc"
            placeholder={'正文 5000 字以内'}
            style={{
              width: width * 0.5,
              height: height - 32 * 3 - 50,
              fontSize: 16
            }}
            onChange={this.onInputMdContent}/>

          <div
            style={{
              width: width * 0.5 - 100,
              height: height - 32 * 3 - 50,
              backgroundColor: color.white
            }}>
            <ReactMarkdown
              className="markdown"
              source={this.state.content}/>
          </div>
        </Layout>
      </Layout>
    );
  }

  onInputMdContent = (area) => {
    this.setState({
      content: area.target.value
    });
  };

  onCategorySelect = (item) => {
    this.setState({
      category: item
    });
  };

  onTagSelect = (value) => {
    this.setState({
      tags: value
    });
  };

  onSubmit = () => {

  };

  onLogout = () => {
    msg.showMsg(msg.INFO, 'logout success');
    storage.saveToken('');
    this.props.dispatch(sceneChange({index0: route.manage, index1: route.login}));
    browserHistory.push("/#/manage/login");
    location.reload();
  }
}

function select(store) {
  return {
    width: store.screen.width,
    height: store.screen.height
  }
}

export default connect(select) (ManageEdit);

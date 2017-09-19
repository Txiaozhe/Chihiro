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
 *     Initial: 2017/09/17        Tang Xiaoji
 */

'use strict';

import React, {Component} from 'react';
import {Icon, BackTop, Layout} from 'antd';
import ReactMarkdown from 'react-markdown';
import {base64} from '../../utils/base64';
import {Http} from '../../utils/http';
import {Url} from '../../config/url';
import {Color} from '../../res';
import './detail.css';
import './markdown.css';

import {connect} from 'react-redux';
import Badge from "./badge";
import {blogContent} from '../../config/test';
import BadgeList from "./badge.list";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  componentDidMount() {
    let {id} = this.props.location.query;
    let did = base64.decode(id);

    const url = Url.url + Url.getBlogDetail.url;
    Http.post(url, null, {
      "id": parseInt(did)
    }, (data) => {
      this.setState({
        content: data.Content
      });
    }, (err) => {
      console.log(err);
    });
  }

  render() {
    let {content} = this.state;
    let {category, year, mon, day, title} = this.props.params;

    let {abstract, tags} = this.props;
    console.log(abstract, tags);

    return (
      <div className="list">
        <BackTop/>

        <Layout style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Color.white
        }}>
          <span className="title">{title}</span>

          <Layout style={{
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: Color.white
          }}>
            <a><Icon style={{fontSize: 24, marginLeft: 20, color: Color.starRed}} type="star-o"/></a>

            <span className="star">200</span>
          </Layout>
        </Layout>

        <div className="date-div">
          <span className="date">{`${year}-${mon}-${day}`}</span>

          <span className="category">{category}</span>

          <Icon type="tag" style={{marginLeft: 50, fontSize: 16}}/>
          <span className="tags">{tags}</span>
        </div>

        <div className="abstract-div">
          <span className="abstract-title">摘要：</span>
          <span className="abstract">{abstract}</span>
        </div>

        <hr className="line"/>

        <ReactMarkdown className="markdownWrapper" source={blogContent}/>

        <br/>

        <Badge/>

        <br/>
        <BadgeList/>
      </div>
    );
  }
}

function select(store) {
  return {
    abstract: store.blog.abstract,
    tags: store.blog.tags
  }
}

export default connect(select)(Detail);

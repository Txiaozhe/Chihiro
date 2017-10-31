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

const host_local = 'https://sslapi.txiaozhe.top';
const host = 'http://txiaozhe.top:7002';
const version = '/api';

export const Url = {
  url: host + version,

  // admin
  login: {
    url: '/admin/login'
  },

  getCount: {
    url: '/init/count'
  },

  // blog list
  getBlogList: {
    url: '/blog/list'
  },
  // blog create
  createBlog: {
    url: '/blog/create'
  },
  // blog detail
  getBlogDetail: {
    url: '/blog/detail'
  },

  // blog list github
  getGithubBlogList: {
    url: '/blog/github/get'
  },

  // blog detail github
  getGithubBlogDetail: {
    url: '/blog/github/detail'
  },

  // badge
  createBadge: {
    url: '/badge/create'
  },
  getBadgeById: {
    url: '/badge/get'
  },

  setStar: {
    url: '/blog/star'
  },

  getStar: {
    url: '/blog/star/get'
  }
};

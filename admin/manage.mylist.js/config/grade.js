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
 *     Initial: 2017/08/13        Tang Xiaoji
 */

'use strict';

import {icon, string} from '../resource';
import route from './route';

const grade = {
  // 主页
  home: {
    route1: route.home,
    title1: string.menu.home,
    icon1: icon.home
  },
  myFocus: {
    route1: route.home,
    title1: string.menu.home,
    icon1: icon.home,
    route2: route.myFocus,
    title2: string.menu.myFocus,
    icon2: icon.myFocus
  },

  // 博客
  blog: {
    route1: route.blog,
    title1: string.menu.blog,
    icon1: icon.blog
  },
  frontend: {
    route1: route.blog,
    title1: string.menu.blog,
    icon1: icon.blog,
    route2: route.frontend,
    title2: string.menu.frontend,
    icon2: icon.frontend
  },
  backend: {
    route1: route.blog,
    title1: string.menu.blog,
    icon1: icon.blog,
    route2: route.backend,
    title2: string.menu.backend,
    icon2: icon.backend
  },
  cloud: {
    route1: route.blog,
    title1: string.menu.blog,
    icon1: icon.blog,
    route2: route.cloud,
    title2: string.menu.cloud,
    icon2: icon.cloud
  },
  works: {
    route1: route.blog,
    title1: string.menu.blog,
    icon1: icon.blog,
    route2: route.works,
    title2: string.menu.works,
    icon2: icon.works
  }
};

export default grade;

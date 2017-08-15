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

const dimension = {
  // 屏幕可见范围宽高
  screenVisibleWidth: document.body.offsetWidth,
  screenVisibleHeight: document.body.offsetHeight,

  // 头部高度
  headerHeight: 64,

  // 尾部高度
  footerHeight: 66,

  // 菜单高度
  menuWidth: 64,
  menuHeight: document.body.offsetHeight - 48,

  // body 高度
  bodyWidth: document.body.offsetHeight / 1.5,
  bodyHeight: document.body.offsetHeight,

  // blog menu 宽度
  blogMenuWidth: document.body.offsetHeight / 1.5,

  // blog frontend body
  frontBodyWidth: document.body.offsetWidth / 1.7,
  frontBodyHeight: document.body.offsetHeight - 66 - 36 - 48 - 20,

  // blog card 右侧的图片
  blogCardWidth: document.body.offsetWidth / 18,
  blogCardHeight: document.body.offsetHeight,

  // blog image
  blogImageWidth: document.body.offsetHeight / 6,
  blogImageHeight: document.body.offsetHeight / 6,

  // user image width
  userImageWidth: 80,

  // user image margin left 用户头像距左侧距离
  userImageMarginRight: (document.body.offsetWidth - document.body.offsetWidth / 1.7 - 64) / 2 - 80
};

export default dimension;

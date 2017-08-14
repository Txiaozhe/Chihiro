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
  bodyHeight: document.body.offsetHeight,

  // blog menu 宽度
  blogMenuWidth: 418,

  // blog frontend body
  frontBodyWidth: document.body.offsetWidth / 2,
  frontBodyHeight: document.body.offsetHeight - 66 - 36 - 48 - 20,

  // blog card
  blogCardWidth: 100,
  blogCardHeight: document.body.offsetHeight,

  // blog image
  blogImageWidth: document.body.offsetHeight / 6,
  blogImageHeight: document.body.offsetHeight / 6
};

export default dimension;

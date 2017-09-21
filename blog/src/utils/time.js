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
 *     Initial: 2017/08/24        Tang Xiaoji
 */

'use strict';

function getDate(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let day = date.getDate();
  let mon = date.getMonth() + 1;

  if(mon < 10) {
    mon = "0" + mon;
  }
  if(day < 10) {
    day = "0" + day;
  }

  return year + "-" + mon + "-" + day;
}

function getTime(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let day = date.getDate();
  let mon = date.getMonth() + 1;

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  return `${year}-${f(mon)}-${f(day)} ${f(h)}:${f(m)}:${f(s)}`;
}

function f(n) {
  return String(100 + n).substring(1)
}

function getDateObj(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let day = date.getDate();
  let mon = date.getMonth() + 1;

  if(mon < 10) {
    mon = "0" + mon;
  }
  if(day < 10) {
    day = "0" + day;
  }

  return {
    year,
    mon,
    day
  };
}

export const Time = {
  getDate,
  getTime,
  getDateObj
};

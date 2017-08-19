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
 *     Initial: 2017/08/19        Tang Xiaoji
 */

'use strict';

import store from '../store';
import {sceneChange} from '../actions';

function extractRoute() {
  let route = window.location.hash;
  let firstIndex = route.indexOf('/');
  let first = route.substring(firstIndex + 1);

  let secIndex = route.indexOf('/', firstIndex + 1);
  if(secIndex === -1) {
    return {
      index0: first
    }
  }

  first = route.substring(firstIndex + 1, secIndex);
  let second = route.substring(secIndex + 1);

  let thirdIndex = route.indexOf('/', secIndex + 1);
  if(thirdIndex === -1) {
    return {
      index0: first,
      index1: second
    }
  }

  second = route.substring(secIndex + 1, thirdIndex);
  return {
    index0: first,
    index1: second
  }
}

export const utils = {
  extractRoute
};

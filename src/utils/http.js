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
 *     Initial: 2017/08/17        Tang Xiaoji
 */

'use strict';

const TIMEOUT = 2 * 1000;

function promiseTimeout(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      console.error('errorrrrr');
      reject(new Error('request timeout!'))
    }, ms);
    promise.then((res) => {
        clearTimeout(timeoutId);
        resolve(res);
      }, (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

function requestByGet(url, token, onSucceed, onFailure) {
  console.log("Get " + url + " started.");

  promiseTimeout(TIMEOUT, fetch(url, { // eslint-disable-line no-undef
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    mode: "cors",
    credentials: "include"
  })).then((resp) => resp.json())
    .then((json) => {
      //console.log("Get Succeed for " + url + ", response:" + JSON.stringify(json));
      onSucceed(json);
    })
    .catch((err) => {
      //console.error("[HTTP Exception] Get failed for " + url + ", error:" + err);
      if (onFailure) {
        onFailure(err);
      }
    })
}

function requestByPost(url, token, params, onSucceed, onFailure) {
  promiseTimeout(TIMEOUT, fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(params)
  })).then((resp) => resp.json())
    .then((json) => {
      console.log("Post succeed for " + url + ", params:" + JSON.stringify(params) + ", response:" + JSON.stringify(json));
      onSucceed(json);
    })
    .catch((err) => {
      console.error("[HTTP Exception] Post failed for " + url + ", error:" + err);

      if (onFailure) {
        onFailure(err);
      }
    });
}

export const http = {
  get: requestByGet,
  post: requestByPost
};

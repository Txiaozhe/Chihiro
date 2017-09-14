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
 *     Initial: 2017/09/14        Tang Xiaoji
 */

'use strict';

let info = (function(){
  let engine = { //渲染引擎
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,

    ver: null
  };
  let browser = { //浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,

    ver: null
  };
  let system = { //系统平台
    win: false,
    mac: false,
    x11: false,

    //移动设备
    iphone: false,
    ipod: false,
    ipad: false,
    android: false,
    nokiaN: false,
    winMobile: false,

    //游戏系统
    wii: false,
    ps: false
  };

  let ua = navigator.userAgent;
  if(window.opera) {
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engine.ver);
  } else if(/AppleWebKit\/(\S+)/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);

    if(/Chrome\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.chrome = parseFloat(browser.ver);
    } else if(/Version\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.safari = parseFloat(browser.ver);
    } else { //近似地确定版本号
      let safariVersion = 1;
      if(engine.webkit < 100) {
        safariVersion = 1;
      } else if(engine.webkit < 312) {
        safariVersion = 1.2;
      } else if(engine.webkit < 412) {
        safariVersion = 1.3;
      } else {
        safariVersion = 2;
      }
      browser.safari = browser.ver = safariVersion;
    }
  } else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.khtml = browser.konq = parseFloat(engine.ver);
  } else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);

    if(/Firefox\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.firefox = parseFloat(browser.ver);
    }
  } else if(/MSIE ([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.ie = browser.ie = parseFloat(engine.ver);
  }

  let p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

  if(system.win) {
    if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if(RegExp["$1"] == "NT") {
        switch(RegExp["$2"]) {
          case "5.0" :
            system.win = "2000";
            break;
          case "5.1" :
            system.win = "XP";
            break;
          case "6.0" :
            system.win = "Vista";
            break;
          case "6.1" :
            system.win = "7";
            break;
          default:
            system.win = "NT";
            break;
        }
      } else if(RegExp["$1"] == '9x') {
        system.win = "ME";
      } else {
        system.win = RegExp["$1"];
      }
    }
  }

  system.iphone = ua.indexOf("iPhone") > -1;
  system.ipod = ua.indexOf("iPod") > -1;
  system.ipad = ua.indexOf("iPad") > -1;
  system.nokiaN = ua.indexOf("NokiaN") > -1;
  if(system.win == "CE") {
    system.winMobile = system.win;
  } else if(system.win == "Ph") {
    if(/Windows Phone OS (\d+\.\d+)/.test(ua)) {
      system.win = "Phone";
      system.winMobile = parseFloat(RegExp["$1"]);
    }
  }
  if(system.mac && ua.indexOf("Mobile") > -1) {
    if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp["$1"].replace("_", "."));
    } else {
      system.ios = 2; //近似
    }
  }
  if(/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp["$1"]);
  }
  system.wii = ua.indexOf("Wii") > -1;
  system.ps = /playstation/i.test(ua);

  return {
    engine: engine,
    browser: browser,
    system: system
  };
})();

let isMobile =
  info.system.iphone
  || info.system.ipod
  || info.system.ipad
  || info.system.android
  || info.system.nokiaN
  || info.system.winMobile;

export let Client = {
  info,
  isMobile: Boolean(isMobile)
};

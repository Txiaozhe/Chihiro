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
 *     Initial: 2017/08/15        Tang Xiaoji
 */

'use strict';

import {notification} from 'antd';

const type = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DESTROY: 'destroy',
  CLOSE: 'close'
};

function getConfig(title, desc, icon, key, btn, onClose) {
  return {
    message: title,
    description: desc,
    icon: icon && icon,
    btn: btn && btn,
    key: key && key,
    onClose: onClose && onClose
  }
}

function showNoti(t, title, msg) {
  const config = getConfig(title, msg);
  switch (t) {
    case type.SUCCESS : {
      notification.success(config);
      break
    }
    case type.WARNING : {
      notification.warning(config);
      break
    }
    case type.ERROR : {
      notification.error(config);
      break
    }
    case type.WARN : {
      notification.warn(config);
      break
    }
    case type.INFO : {
      notification.info(config);
      break
    }
    case type.DESTROY : {
      notification.destroy();
      break
    }
    case type.CLOSE : {
      notification.close(msg);
      break
    }
  }
}

export const noti = {
  ...type,

  getConfig,
  showNoti
};

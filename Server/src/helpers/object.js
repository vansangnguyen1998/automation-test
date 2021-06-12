/**
 * File: \src\helpers\object.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:41:47 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import _ from 'lodash'

const ensure = (val, defaultVal) => {
  if (_.isObject(val)) {
    return val
  }

  if (_.isObject(defaultVal)) {
    return defaultVal
  }

  return {}
}

export default {
  ensure
}

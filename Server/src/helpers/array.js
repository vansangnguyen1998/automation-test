/**
 * File: \src\helpers\array.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:39:27 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, November 21st 2020, 10:39:31 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

import _ from 'lodash'

const ensure = (val, defaultVal) => {
  if (_.isArray(val)) {
    return val
  }

  if (_.isArray(defaultVal)) {
    return defaultVal
  }

  return []
}

/**
 * Remove duplicate values from array
 * @param {val: any}
 */
const unique = val => [...new Set([...ensure(val)])]

export default {
  ensure,
  unique
}

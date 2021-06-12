/**
 * File: \src\helpers\index.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:41:00 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

/** Initialize slack */
import file from './file'
import date from './date'
import array from './array'
import string from './string'
import object from './object'
import directory from './directory'

/**
 * Resolve a ES5 or ES6+ modules
 * @param {String} path
 */
const resolveModule = path => {
  const module = require(path)
  return (module && module.default) || module
}

export default {
  resolveModule,

  date,
  file,
  array,
  string,
  object,
  directory
}

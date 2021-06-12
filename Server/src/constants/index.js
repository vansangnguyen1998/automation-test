/**
 * File: \src\constants\index.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:38:23 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Wednesday, January 6th 2021, 10:11:04 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

import Enum from './enum'
import Regex from './regex'
import Errors from './errors'
import JoiCustom from './joi-custom'

const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR
const ONE_WEEK = 7 * ONE_DAY
const MAX_PRETTY_NUMBER = 999999999999999

export {
  Enum,
  Regex,
  Errors,
  JoiCustom,

  ONE_SECOND,
  ONE_MINUTE,
  ONE_HOUR,
  ONE_DAY,
  ONE_WEEK,

  MAX_PRETTY_NUMBER
}

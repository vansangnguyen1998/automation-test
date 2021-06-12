/**
 * File: \util.js
 * Project: puppet-test
 * Created Date: Saturday, June 12th 2021, 5:41:20 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, June 12th 2021, 5:45:22 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

const randStr = (len = 9, options = {}) => {
  const {
    lowercase = true,
    uppercase = true,
    number = true,
  } = options

  const LowerCases = 'abcdefghijklmnopqrstuvwxyz'
  const UpperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const Numbers = '0123456789'

  const characters = `${lowercase ? LowerCases : ''}${
    uppercase ? UpperCases : ''
  }${number ? Numbers : ''}`

  let str = ''
  for (let i = 0; i < len; i++) {
    str += characters[Math.floor(Math.random() * characters.length)]
  }

  return str
}

module.exports = {
  randStr
};


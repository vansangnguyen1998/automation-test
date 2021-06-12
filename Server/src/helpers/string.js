/**
 * File: \src\helpers\string.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:42:03 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import crypto from 'crypto'

import object from './object'

/**
* Converts any value to a string
* @param {any} value
* @returns {string}
*/
const ensure = value => value ? String(value) : ''

/**
 * Generate a random string
 * @param {number} len - defaults to 9
 * @param {{ lowercase?: Boolean, uppercase?: Boolean, number?: Boolean}} options
 */
const rand = (len = 9, options) => {
  const { lowercase = true, uppercase = true, number = true } = object.ensure(options)

  const LowerCases = 'abcdefghijklmnopqrstuvwxyz'
  const UpperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const Numbers = '0123456789'

  const characters = `${lowercase ? LowerCases : ''}${uppercase ? UpperCases : ''}${number ? Numbers : ''}`

  let str = ''
  for (let i = 0; i < len; i++) {
    str += characters[Math.floor(Math.random() * characters.length)]
  }

  return str
}

/**
 * Converts any value to string and pascal case
 * @param {any} value
 * @returns {string} defaults to ''
 */
const toPascalCase = value => {
  if (!value) {
    return ''
  }

  return String(value)
    // Replaces any - or _ characters with a space
    .replace(/[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace(/[^\w\s]/g, '')
    // Uppercase the first character in each group immediately following a space
    // (delimited by spaces)
    .replace(
      /\s+(.)(\w+)/g,
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    // Removes spaces
    .replace(/\s/g, '')
    // Uppercase first letter
    .replace(/\w/, s => s.toUpperCase())
}

/**
 * Converts any value to string and create md5 hash
 * @param {any} value
 * @return {string}
 */
const toMD5 = value => crypto
  .createHash('md5')
  .update(ensure(value))
  .digest('hex')

/**
 * Uppercase first character
 * @param {any} value
 * @returns {string}
 */
const toCapitalize = value => {
  const str = ensure(value)
  return str.charAt(0).toUpperCase() + str.substr(1)
}

export default {
  ensure,

  rand,
  toMD5,
  toCapitalize,
  toPascalCase
}

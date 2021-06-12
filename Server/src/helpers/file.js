/**
 * File: \src\helpers\file.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:39:56 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, November 21st 2020, 10:40:39 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

import fs from 'fs'
import path from 'path'

import object from './object'

/**
 * Get a filename
 * @param {string} filePath
 * @param {{ extension?: Boolean}} options
 * - extension: defaults to false
 */
const getName = (filePath, options) => {
  const { extension = false } = object.ensure(options)
  if (extension) {
    return path.basename(filePath)
  }

  return path.basename(filePath, path.extname(filePath))
}

/**
 * Check a path to file is exists
 * @param {string} filePath
 */
const isExist = filePath => fs.existsSync(filePath)

/**
 * Async remove file
 * @param {string} filePath
 */
const remove = filePath =>
  new Promise((resolve, reject) => {
    if (!isExist(filePath)) {
      return resolve(false)
    }

    fs.unlink(filePath, error => (error ? reject(error) : resolve(true)))
  })

/**
 * Sync remove file
 * @param {string} filePath
 */
const removeSync = filePath => {
  if (!isExist(filePath)) {
    return false
  }

  fs.unlinkSync(filePath)
  return true
}

/**
 * Get a parent directory's name of current file
 * @param {string} filePath
 */
const getParentDirName = filePath => path.basename(path.dirname(filePath))

export default {
  isExist,

  getName,
  getParentDirName,

  remove,
  removeSync
}

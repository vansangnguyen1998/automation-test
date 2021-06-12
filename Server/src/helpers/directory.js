/**
 * File: \src\helpers\directory.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:39:50 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Tuesday, January 19th 2021, 11:41:33 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

import fs from 'fs'
import mkdirp from 'mkdirp'

/**
 * Check a path to a file or directory is exists or not
 * @param {fs.PathLike} path
 */
const exists = path => fs.existsSync(path)

/**
 * Ensure directory exists
 * @param {string} dirPath
 */
const ensure = dirPath => mkdirp.sync(dirPath)

export default {
  exists,
  ensure
}

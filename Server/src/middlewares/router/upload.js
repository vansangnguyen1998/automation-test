/**
 * File: \src\middlewares\router\upload.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 2:01:48 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import path from 'path'
import multer from 'multer'

import helpers from '@/helpers'

/* Config multer */
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destination = `${global.paths.resources}/temp`
    return callback(null, destination)
  },

  filename: function (req, file, callback) {
    const extname = path.extname(file.originalname)
    const filename =
      [
        path.basename(file.originalname, extname),
        helpers.string.rand(6, { lowercase: false }),
        Date.now()
      ].join('-') + extname

    return callback(null, filename)
  }
})

/** Upload middleware */
const upload = multer({ storage })
export default upload

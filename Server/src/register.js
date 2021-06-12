/**
 * File: \register.js
 * Project: src
 * Created Date: Saturday, November 21st 2020, 10:21:53 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Sunday, May 30th 2021, 11:18:17 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

import 'module-alias/register'

import path from 'path'
import mongoose from 'mongoose'
import leanVirtualsPlugin from 'mongoose-lean-virtuals'

import helpers from '@/helpers'
import paths from '@/constants/paths'
import paginatePlugin from '@/database/plugins/paginate'

/* Apply mongoose global plugins */
mongoose.plugin(paginatePlugin)
mongoose.plugin(leanVirtualsPlugin)

/* Make directories */
const dirs = [path.join(paths.resources, 'temp')]
dirs.forEach(helpers.directory.ensure)

/* Defines global paths */
global.paths = paths

/** Load config */
global.config = require('config')

/** Handle process events */
process.on('uncaughtException', error => {
  console.log('Uncaught Exception:', error)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at ', promise, 'with reason ', reason)
})

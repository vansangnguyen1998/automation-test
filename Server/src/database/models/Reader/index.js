/**
 * File: \src\database\models\Reader\index.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:16:14 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import ReaderSchema from './schema'

const Reader = mongoose.model('Reader', ReaderSchema)
export default Reader


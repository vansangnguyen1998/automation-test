/**
 * File: \src\database\models\Publisher\index.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 11:04:38 am
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import PublisherSchema from './schema'

const Publisher = mongoose.model('Publisher', PublisherSchema)
export default Publisher


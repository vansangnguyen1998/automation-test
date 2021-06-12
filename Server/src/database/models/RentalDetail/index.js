/**
 * File: \src\database\models\RentalDetail\index.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:24:51 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import RentalDetailSchema from './schema'

const RentalDetail = mongoose.model('RentalDetail', RentalDetailSchema)
export default RentalDetail

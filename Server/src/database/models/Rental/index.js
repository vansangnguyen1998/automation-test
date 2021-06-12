/**
 * File: \src\database\models\Rental\index.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:19:35 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import RentalSchema from './schema'

const Rental = mongoose.model('Rental', RentalSchema)
export default Rental

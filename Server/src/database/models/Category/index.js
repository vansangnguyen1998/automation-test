/**
 * File: \src\database\models\Category\index.js
 * Project: dcs-server
 * Created Date: Saturday, December 19th 2020, 2:56:59 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import CategorySchema from './schema'

const Category = mongoose.model('Category', CategorySchema)
export default Category

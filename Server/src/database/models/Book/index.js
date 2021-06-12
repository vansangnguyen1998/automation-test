/**
 * File: \src\database\models\Book\index.js
 * Project: dcs-server
 * Created Date: Saturday, January 23rd 2021, 8:24:34 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import BookSchema from './schema'

const Book = mongoose.model('Book', BookSchema)
export default Book

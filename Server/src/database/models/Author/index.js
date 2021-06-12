/**
 * File: \src\database\models\Author\index.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 11:17:10 am
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import AuthorSchema from './schema'

const Author = mongoose.model('Author', AuthorSchema)
export default Author


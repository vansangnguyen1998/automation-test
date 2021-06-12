/**
 * File: \src\database\models\User\index.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 3:42:37 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Sunday, November 22nd 2020, 10:00 pm
 * Modified By: Van Sang
 * ------------------------------------
 */

import mongoose from 'mongoose'

import UserSchema from './schema'

const User = mongoose.model('User', UserSchema)
export default User

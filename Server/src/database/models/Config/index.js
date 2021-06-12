/**
 * File: \src\database\models\Config\index.js
 * Project: dcs-server
 * Created Date: Saturday, December 19th 2020, 2:56:59 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import mongoose from 'mongoose'

import ConfigSchema from './schema'

const Config = mongoose.model('Config', ConfigSchema)
export default Config

/**
 * File: \src\routes\Core\validation.js
 * Project: library-system
 * Created Date: Tuesday, June 1st 2021, 9:49:07 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import Joi from 'joi'

const login = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}

const logout = {
}

export default {
  login, logout
}

/**
 * File: \src\routes\Core\controller.js
 * Project: library-system
 * Created Date: Tuesday, June 1st 2021, 9:48:57 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { User } from '@/database/models'
import authService from '@/services/auth'
import { APIError } from '@/utils/api-error'

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username, deletedAt: { $exists: false } })
    if (!user) {
      throw new APIError('Your username doesn\'t exists.', APIError.CODES.NOT_FOUND)
    }

    if (!user.isValidPassword(password)) {
      throw new APIError('Incorrect password.')
    }

    if (user.status !== 'active') {
      throw new APIError('Your account has been deactivated.')
    }

    const role = user.role
    const jwtToken = await authService.generateCredential(user._id, role)

    res.cookie('access_token', `Bearer ${jwtToken}`)
    res.setHeader('Authorization', 'Bearer ' + jwtToken)
    return res.json(jwtToken)
  } catch (error) {
    return next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token')

    return res.json({
      code   : 200,
      type   : 'OK',
      message: 'Logout successfully.'
    })
  } catch (error) {
    return next(error)
  }
}

export default { login, logout }

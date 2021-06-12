/**
 * File: \src\middlewares\app\authentication.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 2:02:55 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import authService from '@/services/auth'

/**
 * Authentication application-level middleware
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {NextFunction} next
 */
const authentication = async (req, res, next) => {
  try {
    const jwtToken = authService.getJwtTokenFromRequest(req)
    if (jwtToken) {
      req.user = authService.getAuthentication(jwtToken)
    }

    // req.user = await authService.getAuthentication()

    return next()
  } catch (error) {
    return next(error)
  }
}

export default authentication

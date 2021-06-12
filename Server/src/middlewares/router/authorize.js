/**
 * File: \src\middlewares\router\authorize.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 2:01:37 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { APIError } from '@/utils/api-error'

/**
 * Authorize
 * @param {{ mode: string, roles?: string[]}} authOpts
 */
const authorize = authOpts => (req, res, next) => {
  const errors = {
    CONFLICT: new APIError(
      'You are already logged in.',
      APIError.CODES.CONFLICT
    ),

    UNAUTHORIZED: new APIError(
      'Authentication is needed to get requests response.',
      APIError.CODES.UNAUTHORIZED
    ),
    PERMISSION_DENIED: new APIError(
      'Permission denied.',
      APIError.CODES.FORBIDDEN
    )
  }

  const isAuthenticated = !!req.user
  switch (authOpts.mode) {
    case 'forbidden':
      if (isAuthenticated) {
        return next(errors.CONFLICT)
      }

      return next()

    case 'required':
      if (!isAuthenticated) {
        return next(errors.UNAUTHORIZED)
      }

      if (authOpts.roles && !authOpts.roles.includes(req.user.role)) {
        return next(errors.PERMISSION_DENIED)
      }

      return next()

    case 'optional':
      return next()
  }
}

export default authorize

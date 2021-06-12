/**
 * File: \src\services\auth.js
 * Project: dcs-server
 * Created Date: Friday, December 25th 2020, 9:33:54 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import helpers from '@/helpers'
import { APIError } from '@/utils/api-error'
import config from 'config'
import jwt from 'jsonwebtoken'

/**
 * Get jwt token from request
 * @param {Request} req
 */
const getJwtTokenFromRequest = req => {
  const accessToken = req.headers.authorization || req.cookies.access_token
  const bearerAuthRegex = /^Bearer\s(\S+)$/
  if (!accessToken || !accessToken.match(bearerAuthRegex)) {
    return
  }

  const jwtToken = accessToken.replace(bearerAuthRegex, '$1')
  return jwtToken
}

const generateCredential = async (userId, role) => {
  const lifetime = config.get('token.authentication.lifetime') // ms

  const jwtToken = jwt.sign(
    { userId, role, expires: helpers.date.fromNow(lifetime) },
    config.get('jwt.secret'),
    { expiresIn: '7d' }
  )

  return jwtToken
}

/**
 * Get authentication
 * @param {String} jwtToken
 */
const getAuthentication = jwtToken => {
  try {
    const { userId, role } = jwt.verify(jwtToken, config.get('jwt.secret'))

    return { _id: userId, role }
  } catch (error) {
    throw new APIError('Invalid token.', APIError.CODES.UNAUTHORIZED)
  }
}

export default {
  generateCredential,
  getJwtTokenFromRequest,
  getAuthentication
}

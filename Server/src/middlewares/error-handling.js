/**
 * File: \src\middlewares\error-handling.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:47:54 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { APIError } from '@/utils/api-error'

/**
 * Error handler. Capture stack trace only during development
 * @param {APIResponse} error
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
const handler = (error, req, res, next) => {
  return res.status(error.code).json(error.toObject())
}

/**
 * If error is not an instanceOf APIError, convert it
 * @param {any} error
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
const converter = (error, req, res, next) => {
  if (!(error instanceof APIError)) {
    error = new APIError(
      error.message,
      APIError.CODES.BAD_REQUEST,
      undefined,
      error.stack
    )
  }

  return handler(error, req, res, next)
}

/**
 * Catch 404 and forward to error handler
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
const notFound = (req, res, next) => {
  const apiError = new APIError(
    `Unknown path components: ${req.originalUrl}`,
    APIError.CODES.NOT_FOUND
  )

  return handler(apiError, req, res, next)
}

/**
 * Load Error-handling middlewares
 * @param {Express.Application} app
 */
export const load = app => {
  // if error is not an instanceOf APIError, convert it
  app.use(converter)

  // catch 404 and forward to error handler
  app.use(notFound)

  // Response error
  app.use(handler)
}

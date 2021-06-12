/**
 * File: \src\middlewares\router\validate.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 2:01:56 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import _ from 'lodash'
import Joi from 'joi'
import { APIError } from '@/utils/api-error'

/** Validate incoming request */
const validate = schema => (req, res, next) => {
  /* Defines a joi schema */
  const defaultSchema = {
    body  : Joi.object().keys({}),
    query : Joi.object().keys({}),
    params: Joi.object().keys({}),
    file  : Joi.forbidden(),
    files : Joi.forbidden()
  }
  const joiSchema = Joi.object().keys({ ...defaultSchema, ...schema })

  /* Validate payloads */
  const payloads = _.pick(req, ['body', 'query', 'params', 'file', 'files'])
  const { value, error } = joiSchema.validate(payloads, {
    debug     : true,
    abortEarly: false
  })

  if (error) {
    const errors = error.details.map(detail => detail.message)

    const apiError = new APIError(errors[0], APIError.CODES.BAD_REQUEST)
    return next(apiError)
  }

  /* Assign new value */
  if (_.isPlainObject(value)) {
    Object.assign(req, value)
  }

  return next()
}

export default validate

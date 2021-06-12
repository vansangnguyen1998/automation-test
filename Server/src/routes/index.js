/**
 * File: \src\routes\index.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 1:24:02 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import glob from 'glob'
import Joi from 'joi'

import helpers from '@/helpers'
// import Enum from '@/constants/enum'

/** Get all routes */
export const getRoutes = () => {
  /* Get routes */
  const routes = glob
    // eslint-disable-next-line node/no-path-concat
    .sync(`${__dirname}/*/index.js`)
    .reduce((routes, path) => [...routes, ...helpers.resolveModule(path)], [])

  /* Validate routes definition */
  const methods = ['get', 'post', 'put', 'delete']
  const joiSchema = Joi.array().items(Joi.object({
    method    : Joi.string().lowercase().valid(...methods).required(),
    path      : Joi.string().required(),
    controller: Joi.func(),
    validation: { body: Joi.object(), query: Joi.object(), params: Joi.object(), file: Joi.object(), files: Joi.object() },
    authOpts  : Joi.object({
      mode : Joi.string().valid('forbidden', 'required', 'optional').required(),
      // role: Joi.string().default('student')
      roles: Joi.when('mode', {
        is  : 'required',
        then: Joi.array().items(
          Joi.string().valid('student').required()
        ).unique(),
        otherwise: Joi.forbidden().description('not allow roles')
      })
    }),
    handlers: Joi.array().items(
      Joi.func()
    ),
    tags: Joi.array().items(
      Joi.string().required()
    ).required(),
    codes: Joi.array().items(
      Joi.number().required()
    ),
    summary: Joi.string()
  })).required()

  const { value, error } = joiSchema.validate(routes)
  if (error) {
    throw error
  }

  return value
}

export default getRoutes()
// export default []

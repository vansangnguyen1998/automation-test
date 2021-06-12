/**
 * File: \src\utils\api-error.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:44:28 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import _ from 'lodash'

const definitions = {
  200: {
    type   : 'OK',
    message: 'Success'
  },
  201: {
    type   : 'CREATED',
    message: 'Created'
  },
  400: {
    type   : 'BAD_REQUEST',
    message: 'Bad request.'
  },
  401: {
    type   : 'UNAUTHORIZED',
    message: 'Authentication is needed to get requests response.'
  },
  403: {
    type   : 'FORBIDDEN',
    message: 'Permission denied.'
  },
  404: {
    type   : 'NOT_FOUND',
    message: 'Not found.'
  },
  408: {
    type   : 'REQUEST_TIMEOUT',
    message: 'Request timeout.'
  },
  409: {
    type   : 'CONFLICT',
    message: 'Conflict.'
  },
  422: {
    type   : 'UNPROCESSABLE_ENTITY',
    message: 'Unprocessable entity.'
  }
}

const codes = Object.keys(definitions).reduce(
  (merge, code) => ({
    ...merge,
    [definitions[code].type]: code
  }),
  {}
)

export class APIError extends Error {
  /**
    * @param {string} message
    * @param {number} code
    * @param {*} details
    * @param {*} stack
    */
  constructor (message, code, details, stack) {
    message = message || definitions[code].message
    code = code || codes.BAD_REQUEST

    super(message)

    this.name = this.constructor.name

    this.code = code
    this.type = definitions[code].type

    this.details = details
    this.stack = stack
  }

   DEFINITIONS = definitions
   static DEFINITIONS = definitions

   CODES = codes
   static CODES = codes

   /** Converts apiError to a plain object */
   toObject () {
     const fields = ['type', 'code', 'message', 'details']
     if (process.env.NODE_ENV !== 'production') {
       fields.push('stack')
     }

     return { ..._.pick(this, fields) }
   }
}


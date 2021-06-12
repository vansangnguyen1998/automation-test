/**
 * File: \router.js
 * Project: src
 * Created Date: Saturday, November 21st 2020, 10:22:05 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Tuesday, June 1st 2021, 10:12:10 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

import _ from 'lodash'
import Joi from 'joi'
import { Router } from 'express'
import swaggerUI from '@/utils/swagger-ui-express'

import routes from '@/routes'

import joiToSwagger from '@/utils/joi-to-swagger'
import { validate, authorize } from '@/middlewares/router'

/** Generate API */
const generateAPI = routes => {
  const router = Router()

  for (const { method, path, authOpts, handlers = [], validation, controller } of routes) {
    router[method](path, authorize(authOpts), ...handlers, validate(validation), controller)
  }

  return router
}

/** Generate Swagger Documentation */
const generateDoc = routes => {
  const converts = {
    /**
     * @param {{ query: Joi.ObjectSchema, params: Joi.ObjectSchema }} schema
     */
    parameters: schema => {
      if (_.isEmpty(schema)) {
        return
      }

      const { query, params } = _.get(joiToSwagger(schema), 'swagger.properties')

      const parameters = []
      !_.isEmpty(query) && parameters.push(
        ...Object.keys(query.properties).map(name => ({
          name,
          in      : 'query',
          schema  : query.properties[name],
          required: query.required && query.required.includes(name)
        }))
      )

      !_.isEmpty(params) && parameters.push(
        ...Object.keys(params.properties).map(name => ({
          name,
          in      : 'path',
          schema  : params.properties[name],
          required: params.required && params.required.includes(name)
        }))
      )

      return _.isEmpty(parameters) ? undefined : parameters
    },

    /** @param {{ body: Joi.ObjectSchema, file: Joi.ObjectSchema, files: Joi.ObjectSchema }} schema */
    requestBody: schema => {
      if (_.isEmpty(schema)) {
        return
      }
      schema.file = schema.file && Joi.any().meta({ type: 'file', value: schema.file })
      schema.files = schema.files && Joi.any().meta({ type: 'files', value: schema.files })

      const { body, file, files } = _.get(joiToSwagger(_.pickBy(schema, _.identity)), 'swagger.properties')

      const properties = Object.assign({}, _.get(body, 'properties'), _.get(file, 'properties'), _.get(files, 'properties'))
      const required = [..._.get(body, 'required', []), ..._.get(file, 'required', []), ..._.get(files, 'required', [])]

      const contentTypes = _.isEmpty(file) && _.isEmpty(files)
        ? ['application/x-www-form-urlencoded', 'application/json']
        : ['application/x-www-form-urlencoded', 'application/json', 'multipart/form-data']

      const requestBody = {
        content: contentTypes.reduce((content, contentType) => ({
          ...content,
          [contentType]: {
            schema  : { type: 'object', properties, required },
            required: true
          }
        }), {})
      }
      return _.isEmpty(requestBody) ? undefined : requestBody
    },

    /**
     * @param {{ codes: number[] }}
     */
    responses: codes => {
      const defaults = {
        200: { content: { 'application/json': { example: {} } } },
        201: { content: { 'application/json': { example: {} } } },
        400: { content: { 'application/json': { example: { message: 'Bad request.', status: 'BAD_REQUEST', code: 400 } } } },
        401: { content: { 'application/json': { example: { message: 'Authentication is needed to get requests response.', status: 'UNAUTHORIZED', code: 401 } } } },
        403: { content: { 'application/json': { example: { message: 'Permission denied.', status: 'FORBIDDEN', code: 403 } } } },
        404: { content: { 'application/json': { example: { message: 'Not found.', status: 'NOT_FOUND', code: 404 } } } },
        408: { content: { 'application/json': { example: { message: 'Request timeout.', status: 'REQUEST_TIMEOUT', code: 408 } } } },
        409: { content: { 'application/json': { example: { message: 'Conflict.', status: 'CONFLICT', code: 409 } } } },
        422: { content: { 'application/json': { example: { message: 'Unprocessable entity.', status: 'UNPROCESSABLE_ENTITY', code: 422 } } } }
      }

      return _.pick(defaults, codes)
    },

    /**
     * @param {{ mode: string, roles?: string[] }}
     */
    description: (authOpts) => `
      Authentication: { mode: "${authOpts.mode}" }
    `,
    //      ${authOpts.mode === 'required' ? `Roles: ${authOpts.roles.join(', ')}` : ''}

    /**
     * @param {string} method
     * @param {string} path
     */
    operationId: (method, path) => [
      method,
      ...path.replace(/([^A-Za-z0-9/]*)/g, '').split('/').slice(2)
    ].join('-').replace(/[-]*$/g, '')
  }

  const documentation = {
    openapi: '3.0.3',
    info   : { title: 'Document Control System | Documentation' },
    servers: [
      { url: global.config.get('connection.api') }
    ],
    paths: routes.reduce((paths, { method, path, validation, codes, summary, authOpts, tags }) => {
      const key = path.replace(/(\/:([a-zA-Z_]+))/g, (match, s1, s2) => `/{${s2}}`)
      const value = {
        tags,
        summary,
        responses  : converts.responses(codes),
        operationId: converts.operationId(method, path),
        description: converts.description(authOpts),
        parameters : converts.parameters(_.pick(validation, ['query', 'params'])),
        requestBody: converts.requestBody(_.pick(validation, ['body', 'file', 'files']))
      }

      paths[key] = { ...paths[key], [method]: value }
      return paths
    }, {})
  }
  const options = {
    customSiteTitle: 'Document Control System | Documentation',
    customCss      : `
      .swagger-ui .topbar { display: none }
      .swagger-ui .markdown code, .swagger-ui .renderedMarkdown code {color:#000000; background:#ffffff;}
    `
  }

  const router = Router()
  router.use('/', swaggerUI.serve)
  router.get('/', swaggerUI.setup(documentation, options))

  return router
}

/** API Router */
const apiRouter = Router()
apiRouter.use('/', generateAPI(routes))

/** Documentation Router */
const docRouter = Router()
docRouter.use('/', generateDoc(routes))

/** Application Router */
const router = Router()
router.use('/api', apiRouter)
router.use('/health', (req, res) => res.json(req.user))
router.use('/documentation', docRouter)

export default router

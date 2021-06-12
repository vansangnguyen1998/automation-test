/**
 * File: \src\constants\joi-custom.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:38:36 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, January 30th 2021, 5:14:30 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

import Joi from 'joi'
import _ from 'lodash'

import { MAX_PRETTY_NUMBER } from './index'
import Regex from './regex'

const objectId = () => Joi.string().regex(Regex.objectId)

const page = () => Joi.number().min(1).default(1)

const limit = () => Joi.number().min(1).default(MAX_PRETTY_NUMBER)

/**
 * Joi custom upload single file
 * @param {Object} obj
 * @param {string[]} [obj.mimetypes]
 * @param {string} obj.fieldname
 */
const uploadSingle = ({ mimetypes, fieldname }) => {
  return Joi.object().keys({
    size        : Joi.number().required(),
    path        : Joi.string().required(),
    filename    : Joi.string().required(),
    encoding    : Joi.string().required(),
    mimetype    : _.isEmpty(mimetypes) ? Joi.string().required() : Joi.string().valid(...mimetypes).required(),
    fieldname   : Joi.string().valid(fieldname).required(),
    destination : Joi.string().required(),
    originalname: Joi.string().required()
  })
}

/**
 * Joi custom upload array files
 * @param {Object} obj
 * @param {string[]} [obj.mimetypes]
 * @param {string} obj.fieldname
 * @param {number} [obj.maxCount]
 */
const uploadArray = ({ mimetypes, fieldname, maxCount }) => {
  const schema = Joi.array().items(
    uploadSingle({ mimetypes, fieldname })
  )

  return maxCount ? schema.max(maxCount) : schema
}

export default {
  page,
  limit,

  objectId,
  uploadSingle,
  uploadArray
}

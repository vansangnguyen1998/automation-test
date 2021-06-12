/**
 * File: \src\routes\Author\validation.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:55:40 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import Joi from 'joi'

import { JoiCustom } from '@/constants'

const getMany = {
  query: Joi.object({
    page : JoiCustom.page(),
    limit: JoiCustom.limit()
  })
}

const getOne = {
  query: Joi.object({
    _id: JoiCustom.objectId().required()
  })
}
const deleteData = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  })
}
const create = {
  body: Joi.object({
    code       : Joi.string().required(),
    name       : Joi.string().required(),
    gender     : Joi.string().required(),
    address    : Joi.string().required(),
    birthday   : Joi.date(),
    phone      : Joi.string(),
    email      : Joi.string(),
    description: Joi.string().allow('')
  })
}

const update = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  }),
  body: Joi.object({
    code       : Joi.string().required(),
    name       : Joi.string().required(),
    gender     : Joi.string().required(),
    address    : Joi.string().required(),
    birthday   : Joi.date(),
    phone      : Joi.string(),
    email      : Joi.string(),
    description: Joi.string().allow('')
  })
}

export default {
  getMany,
  getOne,
  create,
  update,
  deleteData
}


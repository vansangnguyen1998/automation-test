/**
 * File: \src\routes\Publisher\validation.js
 * Project: library-system
 * Created Date: Friday, April 23rd 2021, 10:17:42 am
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
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  })
}

const create = {
  body: Joi.object({
    code       : Joi.string().required(),
    name       : Joi.string().required(),
    address    : Joi.string().required(),
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
    address    : Joi.string().required(),
    description: Joi.string().allow('')
  })
}

const deleteData = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  })
}

export default {
  getMany,
  getOne,
  create,
  update,
  deleteData
}

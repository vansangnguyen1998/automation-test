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
const deleteData = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  })
}
const create = {
  body: Joi.object({
    code        : Joi.string().required(),
    rentalDay   : Joi.date(),
    dueDay      : Joi.date(),
    description : Joi.string().allow(''),
    reader      : JoiCustom.objectId(),
    rentalDetail: Joi.array().items(Joi.object({
      book       : JoiCustom.objectId(),
      rentalPrice: Joi.number(),
      number     : Joi.number(),
      note       : Joi.string().allow('')
    }))
  })
}

const update = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  }),
  body: Joi.object({
    code        : Joi.string().required(),
    rentalDay   : Joi.date(),
    dueDay      : Joi.date(),
    description : Joi.string().allow(''),
    reader      : JoiCustom.objectId(),
    rentalDetail: Joi.array().items(Joi.object({
      rental     : JoiCustom.objectId(),
      book       : JoiCustom.objectId(),
      rentalPrice: Joi.number(),
      number     : Joi.number(),
      note       : Joi.string().allow('')
    }))
  })
}

export default {
  getMany,
  getOne,
  create,
  update,
  deleteData
}


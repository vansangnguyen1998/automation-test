/**
 * File: \src\routes\Comment\validation.js
 * Project: dcs-server
 * Created Date: Tuesday, January 19th 2021, 8:28:40 pm
 * Author: Vĩnh Phát
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
    name       : Joi.string().required(),
    description: Joi.string().allow('')
  })
}

const update = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  }),
  body: Joi.object({
    name       : Joi.string(),
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

/**
 * File: \src\routes\Book\validation.js
 * Project: dcs-server
 * Created Date: Sunday, January 24th 2021, 11:15:34 pm
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
    // _id         : JoiCustom.objectId(),
    code        : Joi.string(),
    title       : Joi.string(),
    name        : Joi.string(),
    category    : Joi.string(),
    publisher   : Joi.string(),
    author      : Joi.string(),
    publish_year: Joi.date(),
    issueDate   : Joi.string(),
    pageNumber  : Joi.number(),
    description : Joi.string().allow(''),
    price       : Joi.number(),
    priceRental : Joi.number(),
    language    : Joi.string(),
    subject     : Joi.string(),
    starRating  : Joi.number()
  })
}

const update = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  }),
  body: Joi.object({
    code        : Joi.string(),
    title       : Joi.string(),
    name        : Joi.string(),
    category    : Joi.string(),
    publisher   : Joi.string(),
    author      : Joi.string(),
    publish_year: Joi.date(),
    issueDate   : Joi.string(),
    pageNumber  : Joi.number(),
    description : Joi.string().allow(''),
    price       : Joi.number(),
    priceRental : Joi.number(),
    language    : Joi.string(),
    subject     : Joi.string(),
    starRating  : Joi.number()
  })
}

export default {
  getMany,
  getOne,
  create,
  update,
  deleteData
}

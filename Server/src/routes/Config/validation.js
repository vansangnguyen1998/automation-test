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
    minAge            : Joi.number(),
    maxAge            : Joi.number(),
    expiredReader     : Joi.number(),
    maxYearReceiveBook: Joi.number(),
    maxBookRental     : Joi.number(),
    maxDateRental     : Joi.number()
  })
}

export default {
  getMany,
  getOne,
  create
}

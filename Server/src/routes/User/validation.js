/**
 * File: \src\routes\User\validation.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 3:34:26 pm
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
const changeMeAvatar = {
  file: JoiCustom.uploadSingle({ fieldname: 'avatar' }).required()
}

const create = {
  body: Joi.object({
    name    : Joi.string().required(),
    gender  : Joi.string().required(),
    address : Joi.string().required(),
    birthday: Joi.date(),
    phone   : Joi.string(),
    code    : Joi.string(),
    email   : Joi.string(),
    username: Joi.string(),
    password: Joi.string()
  })
}

const update = {
  params: Joi.object({
    _id: JoiCustom.objectId().required()
  }),
  body: Joi.object({
    name    : Joi.string().required(),
    gender  : Joi.string().required(),
    address : Joi.string().required(),
    birthday: Joi.date(),
    phone   : Joi.string(),
    email   : Joi.string(),
    username: Joi.string(),
    password: Joi.string()
  })
}

export default {
  getMany,
  getOne,
  create,
  changeMeAvatar,
  update
}


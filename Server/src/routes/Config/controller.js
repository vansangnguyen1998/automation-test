/**
 * File: \src\routes\Comment\controller.js
 * Project: dcs-server
 * Created Date: Tuesday, January 19th 2021, 8:28:29 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { Config } from '@/database/models'

import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const config = await Config.findById(req.params._id)
      .lean()

    if (!config) {
      throw new APIError('Config not found.', APIError.CODES.NOT_FOUND)
    }

    return res.json(config)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pagination = await Config.paginate({}, {
      page,
      limit,
      lean: true
    })

    return res.json(pagination)
  } catch (error) {
    return next(error)
  }
}

const create = async (req, res, next) => {
  const session = await Config.startSession()
  session.startTransaction()

  try {
    const { ...infos } = req.body

    const [config] = await Config.create([infos], { session })
    await session.commitTransaction()

    const response = { ...config.toJSON() }
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

export default {
  getOne,
  getMany,
  create
}

/**
 * File: \src\routes\User\controller.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 3:32:00 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { User } from '@/database/models'
import helpers from '@/helpers'
// import util from './util'

import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id)
      .lean()

    if (!user) {
      throw new APIError('User not found.', APIError.CODES.NOT_FOUND)
    }
    return res.json(user)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pagination = await User.paginate({}, {
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
  const session = await User.startSession()
  session.startTransaction()

  try {
    const { ...infos } = req.body
    const [user] = await User.create([infos], { session })
    await session.commitTransaction()

    const response = { ...user.toJSON() }
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const update = async (req, res, next) => {
  const session = await User.startSession()
  session.startTransaction()

  try {
    const { ...newInfos } = req.body

    const user = await User.findById(req.params._id).session(session)
    if (!user) {
      throw new APIError('User not found.', APIError.CODES.NOT_FOUND)
    }

    await Object.assign(user, newInfos).save({ session })
    await session.commitTransaction()

    const response = { ...user.toJSON() }
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const changeMeAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id)
    if (!user) {
      throw new APIError('User not found.', APIError.CODES.NOT_FOUND)
    }

    res.json(user)
  } catch (error) {
    next(error)
  } finally {
    helpers.file.remove(req.file.path)
  }
}

export default {
  getOne,
  getMany,
  create,
  changeMeAvatar,
  update
}


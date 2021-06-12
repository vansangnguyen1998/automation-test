/**
 * File: \src\routes\Reader\controller.js
 * Project: library-system
 * Created Date: Friday, April 23rd 2021, 10:17:36 am
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { Reader, Config, Rental } from '@/database/models'

import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const reader = await Reader.findById(req.params._id)
      .lean()

    if (!reader) {
      throw new APIError('Reader not found.', APIError.CODES.NOT_FOUND)
    }
    return res.json(reader)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pagination = await Reader.paginate({ deletedAt: { $exists: false } }, {
      page,
      limit,
      sort: '-createdAt',
      lean: true
    })

    return res.json(pagination)
  } catch (error) {
    return next(error)
  }
}

const create = async (req, res, next) => {
  const session = await Reader.startSession()
  session.startTransaction()

  try {
    const { ...infos } = req.body
    const code = infos.code
    const checkExists = await Reader.findOne({ code, deletedAt: { $exists: false } })
    if (checkExists) {
      throw new APIError(`${code} Reader exists.`, APIError.CODES.NOT_FOUND)
    }
    const getConfig = await Config.findOne()
    const { expiredReader } = getConfig
    const today = new Date()
    const expiredDate = today.setMonth(today.getMonth() + expiredReader)
    infos.expiredDate = expiredDate
    const [reader] = await Reader.create([infos], { session })
    await session.commitTransaction()

    const response = { ...reader.toJSON() }
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const extendExpiredDate = async (req, res, next) => {
  try {
    const reader = await Reader.findById(req.params._id)
    if (!reader) {
      throw new APIError('Reader not found.', APIError.CODES.NOT_FOUND)
    }
    const getConfig = await Config.findOne()
    const { expiredReader } = getConfig
    const today = new Date()
    const expiredDate = today.setMonth(today.getMonth() + expiredReader)
    reader.expiredDate = expiredDate
    reader.save()
    const response = { ...reader.toJSON() }
    res.json(response)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  const session = await Reader.startSession()
  session.startTransaction()

  try {
    const { ...newInfos } = req.body

    const reader = await Reader.findById(req.params._id).session(session)
    if (!reader) {
      throw new APIError('Reader not found.', APIError.CODES.NOT_FOUND)
    }

    await Object.assign(reader, newInfos).save({ session })
    await session.commitTransaction()

    const response = { ...reader.toJSON() }
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const deleteData = async (req, res, next) => {
  const session = await Reader.startSession()
  session.startTransaction()

  try {
    const { _id } = req.params
    const reader = await Reader.findById(_id).session(session)
    if (!reader) {
      throw new APIError('Reader not found.', APIError.CODES.NOT_FOUND)
    }
    const checkRentalExists = await Rental.findOne({ reader: _id, returnDate: { $exists: false }, deletedAt: { $exists: false } })
    if (checkRentalExists) {
      throw new APIError('Reader exist in unpaid rentals . Please recheck in the Menu Rental.', APIError.CODES.CONFLICT)
    }
    const response = { ...reader.toJSON() }
    await Reader.updateOne({ _id: reader._id }, { deletedAt: new Date() })

    await session.commitTransaction()

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
  create,
  update,
  extendExpiredDate,
  deleteData
}


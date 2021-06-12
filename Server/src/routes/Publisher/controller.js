/**
 * File: \src\routes\Publisher\controller.js
 * Project: library-system
 * Created Date: Friday, April 23rd 2021, 10:17:36 am
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { Publisher, Book } from '@/database/models'

import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const publisher = await Publisher.findById(req.query._id)
      .lean()

    if (!publisher) {
      throw new APIError('Publisher not found.', APIError.CODES.NOT_FOUND)
    }

    return res.json(publisher)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pagination = await Publisher.paginate({ deletedAt: { $exists: false } }, {
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
  const session = await Publisher.startSession()
  session.startTransaction()

  try {
    const { ...infos } = req.body
    const code = infos.code
    const checkExists = await Publisher.findOne({ code, deletedAt: { $exists: false } })
    if (checkExists) {
      throw new APIError(`${code} Publisher exists.`, APIError.CODES.NOT_FOUND)
    }
    const [publisher] = await Publisher.create([infos], { session })
    await session.commitTransaction()

    const response = { ...publisher.toJSON() }
    res.status(201).json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const update = async (req, res, next) => {
  const session = await Publisher.startSession()
  session.startTransaction()

  try {
    const { ...newInfos } = req.body

    const publisher = await Publisher.findById(req.params._id).session(session)
    if (!publisher) {
      throw new APIError('Publisher not found.', APIError.CODES.NOT_FOUND)
    }

    await Object.assign(publisher, newInfos).save({ session })
    await session.commitTransaction()

    const response = { ...publisher.toJSON() }
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const deleteData = async (req, res, next) => {
  const session = await Publisher.startSession()
  session.startTransaction()

  try {
    const { _id } = req.params

    const publisher = await Publisher.findById(_id).session(session)
    if (!publisher) {
      throw new APIError('Publisher not found.', APIError.CODES.NOT_FOUND)
    }
    const checkPublisherExists = await Book.findOne({ category: _id, deletedAt: { $exists: false } })

    if (checkPublisherExists) {
      throw new APIError('Publisher exists in the publisher. Please recheck in the Menu Book.', APIError.CODES.CONFLICT)
    }

    const response = { ...publisher.toJSON() }
    await Publisher.updateOne({ _id: publisher._id }, { deletedAt: new Date() })

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
  deleteData
}


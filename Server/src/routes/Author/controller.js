/**
 * File: \src\routes\Author\controller.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:55:27 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { Author, Book } from '@/database/models'
import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params._id).lean()
    if (!author) {
      throw new APIError('Author not found.', APIError.CODES.NOT_FOUND)
    }
    return res.json(author)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const pagination = await Author.paginate({ deletedAt: { $exists: false } }, {
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
  const session = await Author.startSession()
  session.startTransaction()

  try {
    const { ...infos } = req.body
    const code = infos.code
    const checkExists = await Author.findOne({ code, deletedAt: { $exists: false } })
    if (checkExists) {
      throw new APIError(`${code} Author exists.`, APIError.CODES.NOT_FOUND)
    }
    const [author] = await Author.create([infos], { session })
    await session.commitTransaction()

    res.status(201).json(author.toJSON())
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const update = async (req, res, next) => {
  const session = await Author.startSession()
  session.startTransaction()

  try {
    const { ...newInfos } = req.body

    const author = await Author.findById(req.params._id)
    if (!author) {
      throw new APIError('Author not found.', APIError.CODES.NOT_FOUND)
    }

    await Object.assign(author, newInfos).save({ session })
    await session.commitTransaction()

    res.json(author.toJSON())
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const deleteData = async (req, res, next) => {
  const session = await Author.startSession()
  session.startTransaction()

  try {
    const { _id } = req.params

    const checkBookExists = Book.findOne({ author: _id, deletedAt: { $exists: false } })
    if (checkBookExists) {
      throw new APIError('Author exists in the some books. Please recheck in the Menu Book.', APIError.CODES.CONFLICT)
    }
    const author = await Author.findById(_id).session(session)
    if (!author) {
      throw new APIError('Author not found.', APIError.CODES.NOT_FOUND)
    }

    const response = { ...author.toJSON() }
    await Author.updateOne({ _id: author._id }, { deletedAt: new Date() })

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


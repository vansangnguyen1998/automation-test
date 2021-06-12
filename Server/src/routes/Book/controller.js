/**
 * File: \src\routes\Book\controller.js
 * Project: dcs-server
 * Created Date: Sunday, January 24th 2021, 11:15:25 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { Book, RentalDetail } from '@/database/models'
import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params._id).lean()
    if (!book) {
      throw new APIError('Book not found.', APIError.CODES.NOT_FOUND)
    }

    return res.json(book)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pagination = await Book.paginate({ deletedAt: { $exists: false } }, {
      page,
      limit,
      sort    : '-createdAt',
      populate: [
        { path: 'book' },
        { path: 'publisher' }
      ],
      lean: true
    })

    return res.json(pagination)
  } catch (error) {
    return next(error)
  }
}

const create = async (req, res, next) => {
  const session = await Book.startSession()
  session.startTransaction()

  try {
    const { ...infos } = req.body

    const [book] = await Book.create([infos], { session })
    await session.commitTransaction()

    res.status(201).json(book.toJSON())
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const update = async (req, res, next) => {
  const session = await Book.startSession()
  session.startTransaction()

  try {
    const { ...newInfos } = req.body

    const book = await Book.findById(req.params._id)
    if (!book) {
      throw new APIError('Book not found.', APIError.CODES.NOT_FOUND)
    }

    await Object.assign(book, newInfos).save({ session })
    await session.commitTransaction()

    res.json(book.toJSON())
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const deleteData = async (req, res, next) => {
  const session = await Book.startSession()
  session.startTransaction()

  try {
    const { _id } = req.params

    const book = await Book.findById(_id).session(session)
    if (!book) {
      throw new APIError('Book not found.', APIError.CODES.NOT_FOUND)
    }
    const checkBookExists = await RentalDetail.find({ book: _id }).populate({
      path : 'rental',
      match: { returnDate: { $exists: false } }
    })

    if (checkBookExists.some(b => b.rental !== null)) {
      throw new APIError('Book exists in the rental. Please recheck in the Menu Rentals.', APIError.CODES.CONFLICT)
    }

    const response = { ...book.toJSON() }
    await Book.updateOne({ _id: book._id }, { deletedAt: new Date() })

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


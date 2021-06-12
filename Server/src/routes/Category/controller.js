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

import { Category, Book } from '@/database/models'

import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params._id)
      .lean()

    if (!category) {
      throw new APIError('Category not found.', APIError.CODES.NOT_FOUND)
    }

    return res.json(category)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pagination = await Category.paginate({ deletedAt: { $exists: false } }, {
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
  const session = await Category.startSession()
  session.startTransaction()

  try {
    const { ...infos } = req.body

    const [category] = await Category.create([infos], { session })
    await session.commitTransaction()

    const response = { ...category.toJSON() }
    res.status(201).json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const update = async (req, res, next) => {
  const session = await Category.startSession()
  session.startTransaction()

  try {
    const { ...newInfos } = req.body

    const category = await Category.findById(req.params._id).session(session)
    if (!category) {
      throw new APIError('Category not found.', APIError.CODES.NOT_FOUND)
    }

    await Object.assign(category, newInfos).save({ session })
    await session.commitTransaction()

    const response = { ...category.toJSON() }
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const deleteData = async (req, res, next) => {
  const session = await Category.startSession()
  session.startTransaction()

  try {
    const { _id } = req.params

    const book = await Category.findById(_id).session(session)
    if (!book) {
      throw new APIError('Category not found.', APIError.CODES.NOT_FOUND)
    }
    const checkCategoryExists = await Book.findOne({ category: _id, deletedAt: { $exists: false } })

    if (checkCategoryExists) {
      throw new APIError('Category exists in the book. Please recheck in the Menu Book.', APIError.CODES.CONFLICT)
    }

    const response = { ...book.toJSON() }
    await Category.updateOne({ _id: book._id }, { deletedAt: new Date() })

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


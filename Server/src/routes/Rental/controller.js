/**
 * File: \src\routes\Rental\controller.js
 * Project: library-system
 * Created Date: Friday, April 23rd 2021, 10:17:36 am
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { Rental, Config } from '@/database/models'
import { SaveOrUpdateRentalDetail, DeleteAllRentalDetail } from '../RentalDetail/utils'
import { APIError } from '@/utils/api-error'

const getOne = async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params._id)
      .lean()

    if (!rental) {
      throw new APIError('Rental not found.', APIError.CODES.NOT_FOUND)
    }
    return res.json(rental)
  } catch (error) {
    return next(error)
  }
}

const getMany = async (req, res, next) => {
  try {
    const { page, limit } = req.query

    const pagination = await Rental.paginate({ deletedAt: { $exists: false } }, {
      page,
      limit,
      sort    : '-createdAt',
      populate: [
        { path: 'reader' },
        { path: 'rentalDetail' },
        { path: 'rentalDetail', populate: 'book' }
      ],
      lean: true
    })

    return res.json(pagination)
  } catch (error) {
    return next(error)
  }
}

const create = async (req, res, next) => {
  const session = await Rental.startSession()
  session.startTransaction()

  try {
    const { rentalDetail, ...infos } = req.body
    const { code, reader } = infos
    const getConfig = await Config.findOne()
    const { maxBookRental } = getConfig

    const checkExistsRenting = await Rental.find({ returnDate: { $exists: false }, reader, deletedAt: { $exists: false } }).populate('rentalDetail')
    let currentBookRental = 0// checkExistsRenting.reduce((a, b) => (a?.rentalDetail?.length || 0) + (b?.rentalDetail?.length || 0), 0)

    checkExistsRenting.forEach(e => {
      currentBookRental += e.rentalDetail.length
    })
    if (rentalDetail.length > maxBookRental - currentBookRental) {
      throw new APIError(`You have rented ${currentBookRental} book. you can't rent gather than ${maxBookRental} book`, APIError.CODES.CONFLICT)
    }
    infos.createdBy = req.user
    const checkExists = await Rental.findOne({ code, deletedAt: { $exists: false } })
    if (checkExists) {
      throw new APIError(`${code} Rental exists.`, APIError.CODES.NOT_FOUND)
    }
    const [rental] = await Rental.create([infos], { session })
    const RentalDetail = await Promise.all([...SaveOrUpdateRentalDetail({ rentalDetail, rental: rental._id })])

    await session.commitTransaction()
    const response = { ...rental.toJSON() }
    response.RentalDetail = RentalDetail
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const update = async (req, res, next) => {
  const session = await Rental.startSession()
  session.startTransaction()

  try {
    const { rentalDetail, ...newInfos } = req.body
    const { reader } = newInfos
    const { _id } = req.params
    const rental = await Rental.findById(_id).session(session)
    if (!rental) {
      throw new APIError('Rental not found.', APIError.CODES.NOT_FOUND)
    }

    const getConfig = await Config.findOne()
    const { maxBookRental } = getConfig

    const checkExistsRenting = await Rental.find({ _id: { $ne: _id }, returnDate: { $exists: false }, reader }).populate('rentalDetail')
    let currentBookRental = 0// checkExistsRenting.reduce((a, b) => (a?.rentalDetail?.length || 0) + (b?.rentalDetail?.length || 0), 0)

    checkExistsRenting.forEach(e => {
      currentBookRental += e.rentalDetail.length
    })
    if (rentalDetail.length > maxBookRental - currentBookRental) {
      throw new APIError(`You have rented ${currentBookRental} book. you can't rent gather than ${maxBookRental} book`, APIError.CODES.CONFLICT)
    }
    await Object.assign(rental, newInfos).save({ session })

    await DeleteAllRentalDetail(rental._id)
    const RentalDetail = await Promise.all([...SaveOrUpdateRentalDetail({ rentalDetail, rental: rental._id })])

    await session.commitTransaction()
    const response = { ...rental.toJSON() }
    response.RentalDetail = RentalDetail
    res.json(response)
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}

const deleteData = async (req, res, next) => {
  const session = await Rental.startSession()
  session.startTransaction()

  try {
    const { _id } = req.params
    const rental = await Rental.findById(_id).session(session)
    if (!rental) {
      throw new APIError('Rental not found.', APIError.CODES.NOT_FOUND)
    }

    await DeleteAllRentalDetail(`${rental._id}`)
    const response = { ...rental.toJSON() }
    await Rental.updateOne({ _id: rental._id }, { deletedAt: { $exists: false } })

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


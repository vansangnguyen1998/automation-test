/**
 * File: \src\database\models\Rental\schema.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:19:40 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { Schema } from 'mongoose'

import { APIError } from '@/utils/api-error'

/* Declare a schema */
const definition = {
  code: {
    type    : String,
    required: true
  },
  reader: {
    type    : Schema.Types.ObjectId,
    ref     : 'Reader',
    required: true
  },
  createdBy: {
    type    : Schema.Types.ObjectId,
    ref     : 'User',
    required: true
  },
  rentalDay: {
    type    : Date,
    required: true
  },
  dueDay: {
    type    : Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  description: {
    type: String
  },
  status: {
    type    : String,
    required: true,
    default : 'NEW'
  },
  deletedAt: {
    type: Date
  }
}

const options = {
  timestamps: true,
  collection: 'rentals',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const RentalSchema = new Schema(definition, options)

RentalSchema.virtual('rentalDetail', {
  ref         : 'RentalDetail',
  localField  : '_id',
  foreignField: 'rental'
})

RentalSchema.statics.checkValid = async function (ids = []) {
  if (!ids.length) {
    return
  }

  const nCategories = await this.countDocuments({ _id: { $in: ids }, status: 'active' })
  if (nCategories !== ids.length) {
    throw new APIError(
      `${ids.length - nCategories} category(-ies) not found.`,
      APIError.CODES.NOT_FOUND
    )
  }
}

export default RentalSchema


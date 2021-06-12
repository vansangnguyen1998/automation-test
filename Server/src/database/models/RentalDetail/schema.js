/**
 * File: \src\database\models\RentalDetail\schema.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:24:55 pm
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
  rental: {
    type    : Schema.Types.ObjectId,
    ref     : 'Rental',
    required: true
  },
  book: {
    type    : Schema.Types.ObjectId,
    ref     : 'Book',
    required: true
  },
  rentalPrice: {
    type    : Number,
    required: true
  },
  number: {
    type    : Number,
    required: true
  },
  note: {
    type: String
  },
  deletedAt: {
    type: Date
  }
}

const options = {
  timestamps: true,
  collection: 'rentalDetail',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const RentalDetailSchema = new Schema(definition, options)

RentalDetailSchema.statics.checkValid = async function (ids = []) {
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

export default RentalDetailSchema


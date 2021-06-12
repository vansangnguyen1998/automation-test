/**
 * File: \src\database\models\Book\schema.js
 * Project: dcs-server
 * Created Date: Saturday, January 23rd 2021, 8:24:30 pm
 * Author: Vĩnh Phát
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
  title: {
    type    : String,
    required: true
  },
  name: {
    type    : String,
    required: true
  },
  category: {
    type    : Schema.Types.ObjectId,
    ref     : 'Category',
    required: true
  },
  publisher: {
    type    : Schema.Types.ObjectId,
    ref     : 'Publisher',
    required: true
  },
  author: {
    type    : Schema.Types.ObjectId,
    ref     : 'Author',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref : 'User'
  },
  publish_year: {
    type    : Number,
    required: true
  },
  issueDate: {
    type    : Date,
    required: true
  },
  pageNumber: {
    type    : Number,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: [{
      type: String
    }]
  },
  price: {
    type    : Number,
    required: true
  },
  priceRental: {
    type    : Number,
    required: true
  },
  language: {
    type    : String,
    required: true
  },
  subject: {
    type    : String,
    required: true
  },
  starRating: {
    type: Number
  },
  deletedAt: {
    type: Date
  }
}

const options = {
  timestamps: true,
  collection: 'books',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const BookSchema = new Schema(definition, options)

BookSchema.statics.checkValid = async function (ids = []) {
  if (!ids.length) {
    return
  }

  const nBooks = await this.countDocuments({ _id: { $in: ids }, status: 'active' })

  if (nBooks !== ids.length) {
    throw new APIError(
      `${ids.length - nBooks} book(s) not found.`,
      APIError.CODES.NOT_FOUND
    )
  }
}

export default BookSchema

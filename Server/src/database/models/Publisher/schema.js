/**
 * File: \src\database\models\Publisher\schema.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 11:04:42 am
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
  name: {
    type    : String,
    required: true
  },
  address: {
    type    : String,
    required: true
  },
  description: {
    type: String
  },
  deletedAt: {
    type: Date
  }
}

const options = {
  timestamps: true,
  collection: 'publishers',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const PublisherSchema = new Schema(definition, options)

PublisherSchema.statics.checkValid = async function (ids = []) {
  if (!ids.length) {
    return
  }

  const nPublisher = await this.countDocuments({ _id: { $in: ids } })

  if (nPublisher !== ids.length) {
    throw new APIError(
      `${ids.length - nPublisher} book(s) not found.`,
      APIError.CODES.NOT_FOUND
    )
  }
}

export default PublisherSchema


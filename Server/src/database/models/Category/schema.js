/**
 * File: \src\database\models\Category\schema.js
 * Project: dcs-server
 * Created Date: Saturday, December 19th 2020, 2:57:06 pm
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
  name: {
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
  collection: 'categories',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const CategorySchema = new Schema(definition, options)

CategorySchema.statics.checkValid = async function (ids = []) {
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

export default CategorySchema

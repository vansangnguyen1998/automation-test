/**
 * File: \src\database\models\Reader\schema.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:16:18 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

/**
 * File: \src\database\models\Author\schema.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 11:17:14 am
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
  gender: {
    type    : String,
    required: true
  },
  address: {
    type    : String,
    required: true
  },
  birthday: {
    type: Date
  },
  phone: {
    type: String
  },
  university: {
    type: String
  },
  email: {
    type    : String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type   : String,
    default: 'ACTIVE'
  },
  deletedAt: {
    type: Date
  },
  expiredDate: {
    type: Date
  }
}

const options = {
  timestamps: true,
  collection: 'readers',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const ReaderSchema = new Schema(definition, options)

ReaderSchema.statics.checkValid = async function (ids = []) {
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

export default ReaderSchema


/**
 * File: \src\database\models\Config\schema.js
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
  minAge: {
    type    : Number,
    required: true
  },
  maxAge: {
    type    : Number,
    required: true
  },
  expiredReader: {
    type    : Number,
    required: true
  },
  maxYearReceiveBook: {
    type    : Number,
    required: true
  },
  maxBookRental: {
    type    : Number,
    required: true
  },
  maxDateRental: {
    type    : Number,
    required: true
  }
}

const options = {
  timestamps: true,
  collection: 'configs',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const ConfigSchema = new Schema(definition, options)

ConfigSchema.statics.checkValid = async function (ids = []) {
  if (!ids.length) {
    return
  }

  const nConfigs = await this.countDocuments({
    _id   : { $in: ids },
    status: 'active'
  })
  if (nConfigs !== ids.length) {
    throw new APIError(
      `${ids.length - nConfigs} category(-ies) not found.`,
      APIError.CODES.NOT_FOUND
    )
  }
}

export default ConfigSchema

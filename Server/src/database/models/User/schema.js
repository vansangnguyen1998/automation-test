/**
 * File: \src\database\models\User\schema.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 3:42:34 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Friday, June 11th 2021, 9:30:07 pm
 * Modified By:Van Sang
 * ------------------------------------
 */

import bcrypt from 'bcryptjs'
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
  email: {
    type: String
  },
  username: {
    type    : String,
    required: true
  },
  password: {
    type    : String,
    required: true
  },
  type: {
    type: String
  },
  status: {
    type    : String,
    default : 'active',
    required: true
  },
  role: {
    type    : String,
    default : 'student',
    required: true
  }
}

const options = {
  timestamps: true,
  collection: 'users',
  toObject  : { virtuals: true },
  toJSON    : { virtuals: true }
}

const UserSchema = new Schema(definition, options)

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  }

  return next()
})

UserSchema.statics.checkValid = async function (ids = []) {
  if (!ids.length) {
    return
  }

  const nUsers = await this.countDocuments({ _id: { $in: ids }, status: 'active' })
  if (nUsers !== ids.length) {
    throw new APIError(
      `${ids.length - nUsers} user(s) not found.`,
      APIError.CODES.NOT_FOUND
    )
  }
}

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default UserSchema

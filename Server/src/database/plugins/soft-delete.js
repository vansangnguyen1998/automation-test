/**
 * File: \src\database\plugins\soft-delete.js
 * Project: dcs-server
 * Created Date: Tuesday, March 2nd 2021, 11:34:17 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import joi from 'joi'
import _ from 'lodash'
import mongoose from 'mongoose'

import helpers from '@/helpers'

const normalizeArgs = (conditions, options) => {
  conditions = helpers.object.ensure(conditions)

  if (typeof options !== 'object') {
    conditions = { ...conditions, isDeleted: { $ne: true } }
  } else if (!options.includeTrash) {
    conditions = { ...conditions, isDeleted: { $ne: true } }
    delete options.includeTrash
  }

  if (_.isEmpty(options)) {
    options = undefined
  }

  return { conditions, options }
}

const parseArgs = {
  exists: function (conditions, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    } else if (typeof conditions === 'function') {
      callback = conditions
      conditions = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, callback]
  },

  count: function (conditions, options, callback) {
    if (typeof options === 'function') {
      options = callback
      options = undefined
    } else if (typeof conditions === 'function') {
      callback = conditions
      conditions = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, callback]
  },

  countDocuments: function (conditions, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    } else if (typeof conditions === 'function') {
      callback = conditions
      conditions = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, callback]
  },

  find: function (conditions, projection, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    } else if (typeof projection === 'function') {
      callback = projection
      projection = undefined
    } else if (typeof conditions === 'function') {
      callback = conditions
      conditions = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, projection, normalized.options, callback]
  },

  findOne: function (conditions, projection, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    } else if (typeof projection === 'function') {
      callback = projection
      projection = undefined
    } else if (typeof conditions === 'function') {
      callback = conditions
      conditions = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, projection, normalized.options, callback]
  },

  distinct: function (field, conditions, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    } else if (typeof conditions === 'function') {
      callback = conditions
      conditions = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [field, normalized.conditions, callback]
  },

  findOneAndDelete: function (conditions, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, normalized.options, callback]
  },

  findOneAndRemove: function (conditions, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, normalized.options, callback]
  },

  update: function (conditions, doc, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs(conditions, callback)
    return [normalized.conditions, doc, normalized.options, callback]
  },

  updateOne: function (conditions, doc, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs(conditions, callback)
    return [normalized.conditions, doc, normalized.options, callback]
  },

  updateMany: function (conditions, doc, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs(conditions, callback)
    return [normalized.conditions, doc, normalized.options, callback]
  },

  replaceOne: function (conditions, replacement, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, replacement, callback]
  },

  findOneAndUpdate: function (conditions, update, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs(conditions, options)
    return [normalized.conditions, update, normalized.options, callback]
  }
}

const parseArgsAndFunc = {
  findById: function (_id, projection, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    } else if (typeof projection === 'function') {
      callback = projection
      projection = undefined
    }

    const normalized = normalizeArgs({ _id }, options)
    return mongoose.Model.findOne.apply(this, [normalized.conditions, projection, normalized.options, callback])
  },

  findByIdAndDelete: function (_id, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs({ _id }, options)
    return mongoose.Model.findOneAndDelete.apply(this, [normalized.conditions, normalized.options, callback])
  },

  findByIdAndRemove: function (_id, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs({ _id }, options)
    return mongoose.Model.findOneAndRemove.apply(this, [normalized.conditions, normalized.options, callback])
  },

  findByIdAndUpdate: function (_id, update, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = undefined
    }

    const normalized = normalizeArgs({ _id }, options)
    return mongoose.Model.findOneAndUpdate.apply(this, [normalized.conditions, update, normalized.options, callback])
  }
}

/**
  * Adds schema options
  * @param {Schema} schema
  * @param {Object} [options]
  * @param {{ path: string, schemaTypeOpts: Object }[]} [options.trackingFields]
  */
function addsOptions (schema, options) {
  /* Validate options */
  const joiSchema = joi.object({
    trackingFields: joi.array()
  })

  const { error } = joiSchema.validate(options)
  if (error) {
    const details = error.details.map(detail => detail.message)
    throw new Error(details.join('\n'))
  }

  /* Adds options */
  schema.options.softDelete = helpers.object.ensure(options)
}

/**
  * Adds schema options
  * @param {Schema} schema
  */
function addsPath (schema) {
  schema.add({
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
  })

  /* Adds tracking  */
  const trackingFields = helpers.array.ensure(schema?.options?.softDelete?.trackingFields)
  for (const { path, schemaTypeOpts } of trackingFields) {
    schema.add({ [path]: schemaTypeOpts })
  }
}

/**
  * Overrides schema methods
  * @param {Schema} schema
  */
function overridesMethods (schema) {
  const methods = {
    parseArgs       : Object.keys(parseArgs),
    parseArgsAndFunc: Object.keys(parseArgsAndFunc)
  }

  for (const method of methods.parseArgs) {
    schema.statics[method] = function () {
      return mongoose.Model[method].apply(this, parseArgs[method].apply(undefined, arguments))
    }
  }

  for (const method of methods.parseArgsAndFunc) {
    schema.statics[method] = parseArgsAndFunc[method]
  }
}

/**
  * Defines schema statics
  * @param {Schema} schema
  */
function definesStatics (schema) {
  schema.statics.moveToTrash = function (conditions, tracking, options) {
    if (_.isEmpty(conditions)) {
      throw new mongoose.Error('Conditions field is required.')
    }

    const doc = { isDeleted: true, deletedAt: new Date() }

    /* Assign tracking fields if exists */
    if (_.isPlainObject(tracking)) {
      Object.keys(tracking).forEach(path => {
        if (schema.path(path)) {
          doc[path] = tracking[path]
        }
      })
    }

    return this.updateMany(conditions, doc, options)
  }

  schema.statics.getTrash = function () {
    return mongoose.Model.find.apply(this, arguments).where('isDeleted').equals(true)
  }

  schema.statics.restore = function (conditions, tracking, options) {
    if (_.isEmpty(conditions)) {
      throw new mongoose.Error('Conditions field is required.')
    }

    const doc = { isDeleted: false, deletedAt: { $unset: '' } }

    /* Remove all tracking fields if exists */
    if (_.isPlainObject(tracking)) {
      for (const path of Object.keys(tracking)) {
        if (schema.path(path)) {
          doc.$unset = { ...doc.$unset, [path]: '' }
        }
      }
    }

    return mongoose.Model.updateMany.apply(this, [{ ...conditions, isDeleted: true }, doc, options])
  }

  return schema
}

/**
  * Defines schema methods
  * @param {Schema} schema
  */
function definesMethods (schema) {
  schema.methods.moveToTrash = function (tracking, options) {
    tracking = helpers.object.ensure(tracking)

    this.isDeleted = true
    this.deletedAt = new Date()

    for (const [key, value] of Object.entries(tracking)) {
      if (schema.path(key)) {
        this[key] = value
      }
    }

    return this.save(options)
  }

  schema.methods.restore = function (options) {
    this.isDeleted = false
    this.deletedAt = undefined

    /* Remove all tracking fields if exists */
    const trackingFields = _.get(this, 'schema.options.softDelete.trackingFields')
    if (!_.isEmpty(trackingFields)) {
      for (const { path } of trackingFields) {
        this[path] = undefined
      }
    }

    return this.save(options)
  }
}

/**
  * Defines schema hooks
  * @param {Schema} schema
  */
function definesHooks (schema) {
  schema.pre('save', function (next) {
    if (typeof this.isDeleted !== 'boolean') {
      this.isDeleted = false
    }

    return next()
  })

  schema.pre('aggregate', function (next) {
    const first = JSON.stringify(this.pipeline()[0])

    if (first === '{"includeTrash":true}') {
      this.pipeline().shift()
      this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    } else if (first === '{"includeTrash":false}') {
      this.pipeline().shift()
    }

    return next()
  })
}

/**
  * Mongoose soft delete plugin (BETA)
  * @param {Schema} schema
  * @param {Object} [options]
  * @param {{ path: string, schemaTypeOpts: Object }[]} [options.trackingFields]
  * @References: https://github.com/dsanel/mongoose-delete
  */
function softDeletePlugin (schema, options) {
  /* Validate options */
  addsOptions(schema, options)

  /* Adds path to schema  */
  addsPath(schema, options)

  /* Defines hooks */
  definesHooks(schema)

  /* Overrides methods */
  overridesMethods(schema)

  /* Defines statics */
  definesStatics(schema)

  /* Defines methods */
  definesMethods(schema)
}

export default softDeletePlugin

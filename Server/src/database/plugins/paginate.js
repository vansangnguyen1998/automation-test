/**
 * File: \src\database\plugins\paginate.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:59:30 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

/**
 * A paginate static method for mongoose model
 * @param {Object} [conditions] - defaults to {}
 * @param {Object} [config] - defaults to {}
 * @param {Function} [callback] - defaults to {}
 * @returns {Promise<Pagination>} a pagination of mongoose model
 */
function paginate (conditions = {}, config = {}, callback) {
  /* Normalize data */
  if (typeof config === 'function') {
    callback = config
    config = {}
  } else if (typeof conditions === 'function') {
    callback = conditions
    config = {}
    conditions = {}
  }

  const {
    sort,
    lean = false,
    page = 1,
    limit = 10,
    offset = 0,
    select,
    populate,
    projection,
    options
  } = config

  const skip = (page - 1) * limit + offset

  /* Paginate a mongoose model */
  return Promise.all([
    this.find(conditions, projection, options)
      .populate(populate)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(lean),
    this.countDocuments(conditions)
  ])
    .then(([docs = [], total = 0]) => {
      const pages = Math.ceil(total / limit) || 1
      const pagination = { docs, page, limit, total, offset, pages }

      if (typeof callback === 'function') {
        return callback(null, pagination)
      }

      return Promise.resolve(pagination)
    })
    .catch(error => {
      if (typeof callback === 'function') {
        return callback(error)
      }

      return Promise.reject(error)
    })
}

/**
 * Mongoose paginate plugin (BETA)
 * @param {Schema} schema
 * @References: https://github.com/edwardhotchkiss/mongoose-paginate
 */
export default function paginatePlugin (schema) {
  schema.statics.paginate = paginate
}

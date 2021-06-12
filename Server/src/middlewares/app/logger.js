/**
 * File: \src\middlewares\app\logger.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 4:10:21 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

const logger = async (req, res, next) => {
  try {
    return next()
  } catch (error) {
    return next(error)
  }
}

export default logger

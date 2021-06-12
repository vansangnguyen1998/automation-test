/**
 * File: \server.js
 * Project: src
 * Created Date: Saturday, November 21st 2020, 10:22:10 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Sunday, May 30th 2021, 11:18:17 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

import './register'

import app from './app'
// import cache from '@cache'
import database from '@/database'

/**
 * Create a express server
 * @param {Express.Application} app
 * @returns {Server} server
 */
const createServer = async app => {
  /* Load models */
  database.loadModels()

  /* Connect to Services */
  Promise.all([
    database.connectToMongo()
    // cache.connectToRedis()
  ])

  /* Listen for connections */
  const port = process.env.PORT || global.config.get('connection.port')
  return app.listen(port, () =>
    console.log(`Server listening port ${port}.`)
  )
}

/** Express Server */
export default createServer(app)

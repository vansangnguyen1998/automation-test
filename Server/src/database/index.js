/**
 * File: \index.js
 * Project: database
 * Created Date: Saturday, November 21st 2020, 10:20:57 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Sunday, May 30th 2021, 11:16:54 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

import glob from 'glob'
import config from 'config'
import mongoose from 'mongoose'

import helpers from '@/helpers'

/** Connect to MongoDB */
const connectToMongo = () => {
  const uri = config.get('mongo.uri')
  const options = {
    useCreateIndex    : true,
    useNewUrlParser   : true,
    useFindAndModify  : false,
    useUnifiedTopology: true
  }

  /** Handle mongoose connection events */
  mongoose.connection.on('connecting', () => {
    console.log('Connecting to Mongo...')
  })

  mongoose.connection.on('connected', () => {
    console.log('Mongo is connected.')
  })

  mongoose.connection.on('reconnected', () => {
    console.log('Mongo trying to reconnect...')
  })

  mongoose.connection.on('error', error => {
    console.error('Unable to connect to the Mongo: ', error)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongo has disconnected!')

    // Trying to connect
    const waitingMS = 5000
    setTimeout(() => {
      console.log(`Reconnecting in ${waitingMS / 1000}s...`)
      return mongoose.connect(uri, options)
    }, waitingMS)
  })

  return mongoose.connect(uri, options)
}

const loadModels = () => glob
  .sync(`${global.paths.database}/models/*/index.js`)
  .forEach(helpers.resolveModule)

export default { connectToMongo, loadModels }

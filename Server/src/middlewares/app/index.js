/**
 * File: \src\middlewares\app\index.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:48:07 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import cors from 'cors'
import config from 'config'
import helmet from 'helmet'
import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import connectMongo from 'connect-mongo'

import logger from './logger'
import authentication from './authentication'

/**
 * Load Application-Level middlewares
 * @param {Express.Application} app
 */
export const load = app => {
/* ======= Use Application-level middlewares ======= */
// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
  app.use(compression())

  // Secure your Express apps by setting various HTTP header
  app.use(helmet())

  // Enable CORS - Cross Origin Resource Sharing
  app.use(cors())

  // Parses incoming requests with JSON payloads
  app.use(express.json())

  // Parses incoming requests with urlencoded payloads
  app.use(express.urlencoded({ extended: true }))

  // Create a session middleware
  const MongoStore = connectMongo(session)
  app.use(
    session({
      ...config.get('session'),
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  )

  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
  app.use(cookieParser())

  // Customized middlewares
  app.use(authentication, logger)

  //
  app.use('/resources', express.static('resources'))
}

/**
 * File: \app.js
 * Project: src
 * Created Date: Saturday, November 21st 2020, 10:21:37 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Sunday, May 30th 2021, 11:17:06 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

import express from 'express'

import router from './router'
import { load as loadAppMiddlewares } from '@/middlewares/app'
import { load as loadErrorHandling } from '@/middlewares/error-handling'

/** Express Application */
const app = express()

// Shows the real origin IP logs
app.enable('trust proxy')

/* ======== Load Application-Level middlewares ======== */
loadAppMiddlewares(app)

/* ================== Mount Routes ================== */
app.use(router)

/* ======== Use Error-handling middlewares ======== */
loadErrorHandling(app)

export default app

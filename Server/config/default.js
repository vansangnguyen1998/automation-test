/**
 * File: \config\default.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:27:09 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Tuesday, June 1st 2021, 9:56:45 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

import { ONE_HOUR, ONE_DAY } from '@/constants'

module.exports = {
  project: 'document-control-system',

  mongo: {
    uri: 'mongodb+srv://admin:admin1243@cluster0.vob0i.mongodb.net/invitationsDB?retryWrites=true&w=majority'
  },
  redis: {
    host          : 'redis-14435.c15.us-east-1-2.ec2.cloud.redislabs.com',
    password      : 'o69bjisYVFPN8toEqMlWdjkM4NwCb29m',
    port          : 14435,
    detect_buffers: true,
    lazyConnect   : true
  },
  session: {
    secret           : 'BbHDgqxZ5Lpu5IgiVxUJgUXl7KfbiWC-ZPhO-IZwWJI',
    maxAge           : ONE_HOUR,
    resave           : false,
    saveUninitialized: true,
    cookie           : {
      secure: false,
      maxAge: ONE_HOUR
    }
  },
  cookie: {
    secret: 'e2ssxrGC2xkfDmczwCEsJUsJ4_05LxlU7sW9cKVcltM'
  },
  jwt: {
    secret: 'nfsgeTvRfFuDj-XR2RggrsjdFayQSxfVQgRnFNmoEN8'
  },
  token: {
    authentication: {
      lifetime: 7 * ONE_DAY
    },
    verification: {
      lifetime: ONE_HOUR * 2
    }
  },

  storage: {
    api: 'https://dcs-storage.herokuapp.com/'
  }
}

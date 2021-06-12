/**
 * File: \src\cache\index.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:36:47 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, December 19th 2020, 5:11:23 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

import config from 'config'
import Redis from 'ioredis'

class Cache extends Redis {
  /** Connect to Redis */
  connectToRedis () {
    this.on('ready', () => {
      console.log('Redis is ready.')
    })

    this.on('connect', () => {
      console.log('Redis is connected.')
    })

    this.on('reconnecting', () => {
      console.log('Redis trying to reconnect...')
    })

    this.on('error', err => {
      console.error('Unable to connect to the Redis: ', err)
    })

    this.on('end', () => {
      console.log('Redis has closed!')
    })

    return this.connect()
  }

  /**
   * Get keys by pattern
   * @param {string} [pattern] default is '*'
   */
  async getKeys (pattern = '*') {
    const response = []

    let cursor = 0
    do {
      const [newCursor, keys] = await this.scan(cursor, 'MATCH', pattern)

      cursor = Number(newCursor)
      response.push(...keys)
    } while (cursor !== 0)

    return response
  }
}

const options = config.get('redis')
const cache = new Cache(options)

export default cache

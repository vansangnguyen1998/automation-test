/**
 * File: \src\services\storage.js
 * Project: dcs-server
 * Created Date: Friday, January 15th 2021, 11:20:20 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import fs from 'fs'
import path from 'path'
import axios from 'axios'
import FormData from 'form-data'

const apiStorage = global.config.get('storage.api')

/**
 * Upload
 * @param {{ filePath: string, folder: string }}
 * @returns {Promise<string>}
 */
const upload = async ({ filePath, folder }) => {
  const formData = new FormData()

  formData.append('data', fs.createReadStream(filePath))
  formData.append('key', `${folder}/${path.basename(filePath)}`)

  try {
    const response = await axios.post(`${apiStorage}resources`, formData, {
      headers: formData.getHeaders()
    })

    return response.data.location
  } catch (error) {
    throw new Error(`[DCS_STORAGE] ${error.response.data.message}.`)
  }
}

/**
 * Remove
 * @param {string} location
 */
const remove = async location => {
  try {
    await axios.delete(`${apiStorage}resources`, {
      data: { location }
    })
  } catch (error) {
    throw new Error(`[DCS_STORAGE] ${error.response.data.message}.`)
  }
}

export default { upload, remove }

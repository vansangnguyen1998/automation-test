/**
 * File: \src\middlewares\router\index.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 2:02:02 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import validate from './validate'
import authorize from './authorize'
import upload, { assignFilePaths } from './upload'

export { validate, authorize, upload, assignFilePaths }

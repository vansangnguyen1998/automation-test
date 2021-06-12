/**
 * File: \config\development.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:28:04 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Sunday, May 30th 2021, 11:40:43 pm
 * Modified By: Văn Sang
 * ------------------------------------
 */

const port = 3002

module.exports = {
  connection: {
    port,
    url          : `http://localhost:${port}`,
    api          : `http://localhost:${port}/api`,
    documentation: `http://localhost:${port}/documentation`
  }
}

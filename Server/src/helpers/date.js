/**
 * File: \src\helpers\date.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:39:37 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, November 21st 2020, 10:39:41 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

/**
 * Get a date from now
 * @param {Number} timeMS
 * @returns {Date}
 */
const fromNow = timeMS => new Date(Date.now() + timeMS)

export default { fromNow }

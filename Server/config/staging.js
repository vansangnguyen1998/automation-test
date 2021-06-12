/**
 * File: \config\production.js
 * Project: dcs-server
 * Created Date: Monday, January 18th 2021, 9:07:26 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

module.exports = {
  connection: {
    port         : 3002,
    url          : 'https://dcs-server.herokuapp.com/',
    api          : 'https://dcs-server.herokuapp.com/api',
    documentation: 'https://dcs-server.herokuapp.com/documentation'
  },
  mongo: {
    uri: 'mongodb+srv://admin:admin1243@cluster0.fhgs9.mongodb.net/document-control-system?retryWrites=true&w=majority'
  },
  redis: {
    host          : 'redis-14435.c15.us-east-1-2.ec2.cloud.redislabs.com',
    password      : 'o69bjisYVFPN8toEqMlWdjkM4NwCb29m',
    port          : 14435,
    detect_buffers: true,
    lazyConnect   : true
  }
}

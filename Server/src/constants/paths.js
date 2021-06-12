/**
 * File: \src\constants\paths.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:38:46 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Saturday, November 21st 2020, 10:38:49 pm
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

import path from 'path'

const root = path.join(__dirname, '../../')

const paths = {
  root,

  src      : path.join(root, 'src'),
  config   : path.join(root, 'config'),
  resources: path.join(root, 'resources'),

  jobs       : path.join(root, 'src/jobs'),
  cache      : path.join(root, 'src/cache'),
  utils      : path.join(root, 'src/utils'),
  routes     : path.join(root, 'src/routes'),
  helpers    : path.join(root, 'src/helpers'),
  database   : path.join(root, 'src/database'),
  services   : path.join(root, 'src/services'),
  commands   : path.join(root, 'src/commands'),
  constants  : path.join(root, 'src/constants'),
  middlewares: path.join(root, 'src/middlewares')
}

export default paths

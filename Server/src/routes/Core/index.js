/**
 * File: \src\routes\Core\index.js
 * Project: library-system
 * Created Date: Tuesday, June 1st 2021, 9:49:02 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import controller from './controller'
import validation from './validation'

export default [
  {
    method  : 'POST',
    path    : '/login',
    authOpts: { mode: 'forbidden' },

    controller: controller.login,
    validation: validation.login,

    tags: ['core']
  },

  {
    method  : 'DELETE',
    path    : '/logout',
    authOpts: { mode: 'required' },

    controller: controller.logout,
    validation: validation.logout,

    tags: ['core']
  },

  {
    method  : 'GET',
    path    : '/check',
    authOpts: { mode: 'required', roles: ['student'] },

    controller: (req, res, next) => res.json(req.user),
    validation: {},

    tags: ['core']
  }
]

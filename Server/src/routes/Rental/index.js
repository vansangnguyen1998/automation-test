/**
 * File: \src\routes\Publisher\index.js
 * Project: library-system
 * Created Date: Friday, April 23rd 2021, 10:17:28 am
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import controller from './controller'
import validation from './validation'
const path = 'rentals'

export default [
  {
    method    : 'GET',
    path      : `/${path}`,
    controller: controller.getMany,
    validation: validation.getMany,
    authOpts  : { mode: 'required', roles: ['student'] },

    tags: [path]
  },
  {
    method    : 'POST',
    path      : `/${path}`,
    controller: controller.create,
    validation: validation.create,
    authOpts  : { mode: 'required', roles: ['student'] },
    tags      : [path]
  },
  {
    method    : 'GET',
    path      : `/${path}/:_id`,
    controller: controller.getOne,
    validation: validation.getOne,
    authOpts  : { mode: 'required', roles: ['student'] },

    tags: [path]
  },
  {
    method    : 'PUT',
    path      : `/${path}/:_id`,
    controller: controller.update,
    validation: validation.update,
    authOpts  : { mode: 'required', roles: ['student'] },

    tags: [path]
  },
  {
    method    : 'DELETE',
    path      : `/${path}/:_id`,
    controller: controller.deleteData,
    validation: validation.deleteData,
    authOpts  : { mode: 'required', roles: ['student'] },

    tags: [path]
  }
]


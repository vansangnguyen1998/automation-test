/**
 * File: \src\routes\Author\index.js
 * Project: library-system
 * Created Date: Thursday, April 22nd 2021, 12:55:31 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import controller from './controller'
import validation from './validation'
const path = 'authors'

export default [
  {
    method    : 'GET',
    path      : `/${path}`,
    controller: controller.getMany,
    validation: validation.getMany,
    authOpts  : {
      mode: 'optional'
    },

    tags: [path]
  },
  {
    method    : 'POST',
    path      : `/${path}`,
    controller: controller.create,
    validation: validation.create,
    authOpts  : {
      mode: 'optional'
    },

    tags: [path]
  },
  {
    method    : 'GET',
    path      : `/${path}/getOne`,
    controller: controller.getOne,
    validation: validation.getOne,
    authOpts  : {
      mode: 'optional'
    },

    tags: [path]
  },
  {
    method    : 'PUT',
    path      : `/${path}/:_id`,
    controller: controller.update,
    validation: validation.update,
    authOpts  : {
      mode: 'optional'
    },

    tags: [path]
  },
  {
    method    : 'DELETE',
    path      : `/${path}/:_id`,
    controller: controller.deleteData,
    validation: validation.deleteData,
    authOpts  : {
      mode: 'optional'
    },

    tags: [path]
  }
]


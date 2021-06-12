/**
 * File: \src\routes\Book\index.js
 * Project: dcs-server
 * Created Date: Sunday, January 24th 2021, 11:15:44 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import controller from './controller'
import validation from './validation'
const path = 'books'

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

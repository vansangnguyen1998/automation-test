/**
 * File: \src\routes\User\index.js
 * Project: dcs-server
 * Created Date: Sunday, November 22nd 2020, 3:30:52 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import controller from './controller'
import validation from './validation'
import { upload } from '@/middlewares/router'
const path = 'users'

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
    path      : `/${path}/:_id`,
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
    method  : 'PUT',
    path    : `/${path}/:_id/avatar`,
    authOpts: { mode: 'required' },

    handlers  : [upload.single('avatar')],
    controller: controller.changeMeAvatar,
    validation: validation.changeMeAvatar,
    tags      : [path]
  }
]


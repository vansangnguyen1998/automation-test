/**
 * File: \src\routes\User\util.js
 * Project: library-system
 * Created Date: Sunday, May 30th 2021, 11:12:22 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { User } from '@/database/models'

import { APIError } from '@/utils/api-error'
import storageService from '@/services/storage'

const changeAvatar = async (userId, filePath) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new APIError('User not found.', APIError.CODES.NOT_FOUND)
  }

  const oldAvatar = user.avatar

  user.avatar = await storageService.upload({
    filePath,
    folder: `User/${userId}/avatar`
  })

  await user.save()

  if (oldAvatar) {
    await storageService.remove(oldAvatar)
  }

  return { ...user.toJSON(), password: undefined }
}

export default {
  changeAvatar
}


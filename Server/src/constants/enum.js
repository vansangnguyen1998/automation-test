/**
 * File: \src\constants\enum.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:38:02 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified: Friday, March 26th 2021, 10:36:48 am
 * Modified By: Vĩnh Phát
 * ------------------------------------
 */

/* User */
const USER_STATUSES = ['active', 'inactive']

/* Category */
const CATEGORY_STATUSES = ['active', 'inactive']

/* Book */
const BOOK_STATUSES = ['active', 'inactive']

/* Resource */
const RESOURCE_URGENCIES = ['low', 'normal', 'high']

const RESOURCE_STATUSES = [
  'open',
  'in_progress',
  'done',
  'cancelled'
]

const RESOURCE_TYPES = [
  'notice', // Thông báo
  'incoming', // Văn bản đến
  'outgoing', // Văn bản đi
  'incoming_need_reply', // Văn bản đến cần trả lời
  'incoming_need_signature' // Vẳn bản đến cần chữ ký
]

/* Resource Process Task */
const RESOURCE_PROCESS_TASK_MODES = [
  // 'assignee',
  // 'department'
]

const RESOURCE_PROCESS_TASK_STATUSES = ['open', 'in_progress', 'done']
const RESOURCE_PROCESS_TASK_MISSIONS = ['upload', 'approval', 'sign', 'express_an_opinion']

export default {
  USER_STATUSES,

  CATEGORY_STATUSES,

  BOOK_STATUSES,

  RESOURCE_TYPES,
  RESOURCE_STATUSES,
  RESOURCE_URGENCIES,

  RESOURCE_PROCESS_TASK_MODES,
  RESOURCE_PROCESS_TASK_STATUSES,
  RESOURCE_PROCESS_TASK_MISSIONS
}

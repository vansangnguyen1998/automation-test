/**
 * File: \src\database\models\index.js
 * Project: dcs-server
 * Created Date: Saturday, November 21st 2020, 10:59:01 pm
 * Author: Vĩnh Phát
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import Author from './Author'
import Book from './Book'
import Category from './Category'
import Publisher from './Publisher'
import Config from './Config'

import Reader from './Reader'
import Rental from './Rental'
import RentalDetail from './RentalDetail'

import User from './User'

export {
  User,
  Author,
  Reader,
  Config,
  Category,
  Book,
  Rental,
  RentalDetail,
  Publisher
}

export default {
  User,
  Author,
  Reader,
  Category,
  Book,
  Rental,
  RentalDetail,
  Publisher
}

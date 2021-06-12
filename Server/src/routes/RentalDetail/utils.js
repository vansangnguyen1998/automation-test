/**
 * File: \src\routes\RentalDetail\utils.js
 * Project: library-system
 * Created Date: Tuesday, June 1st 2021, 9:50:39 pm
 * Author: Văn Sang
 * -----
 * Last Modified:
 * Modified By:
 * ------------------------------------
 */

import { RentalDetail } from '@/database/models'

export const SaveOrUpdateRentalDetail = ({ rentalDetail, rental }) => {
  const rentalDetailPromise = rentalDetail.map((rd) => {
    const { _id } = rd
    if (_id) {
      delete rd._id
      return RentalDetail.updateOne({ _id }, rd)
    } else {
      rd.rental = rental
      return new RentalDetail(rd).save()
    }
  })

  return rentalDetailPromise
}

export const DeleteAllRentalDetail = (rental) => {
  return RentalDetail.updateMany({ rental: rental }, { deletedAt: { $exists: false } })
}

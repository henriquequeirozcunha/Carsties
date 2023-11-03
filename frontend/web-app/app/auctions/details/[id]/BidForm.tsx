'use client'

import { useBidStore } from '@/app/hooks/useBidStore'
import { numberWithCommas } from '@/app/lib/numberWithComma'
import { placeBidForAuction } from '@/app/services/auction'
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type BidFormProps = {
  auctionId: string
  highBid: number
}

function BidForm({ auctionId, highBid }: BidFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const addBid = useBidStore((state) => state.addBid)

  function onSubmit(data: FieldValues) {
    placeBidForAuction(auctionId, +data.amount)
      .then((bid) => {
        if (bid.error) {
          throw bid.error
        }

        addBid(bid)
        reset()
      })
      .catch((err) => toast.error(err.message))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex items-center border-2 rounded-lg py-2'
    >
      <input
        type='number'
        {...register('amount')}
        className='input-custom text-sm text-gray-500'
        placeholder={`Enter your bid (minimum bid is $${numberWithCommas(
          highBid + 1
        )})`}
      />
    </form>
  )
}

export default BidForm

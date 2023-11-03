'use client'

import Heading from '@/app/components/Heading'
import { useBidStore } from '@/app/hooks/useBidStore'
import { getBidsForAuction } from '@/app/services/auction'
import { Auction } from '@/models/auction'
import { Bid } from '@/models/bid'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BidItem from './BidItem'

type BidListProps = {
  user: User | null
  auction: Auction
}

function BidList({ auction, user }: BidListProps) {
  const [isLoading, setIsLoading] = useState(false)
  const bids = useBidStore((state) => state.bids)
  const setBids = useBidStore((state) => state.setBids)

  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error
        }

        setBids(res as Bid[])
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [auction.id, setBids])

  if (isLoading) return <span>Loading....</span>

  return (
    <div className='border-2 rounded-lg p-2 bg-gray-100'>
      <Heading title='Bids' />
      {bids.map((bid) => (
        <BidItem key={bid.id} bid={bid} />
      ))}
    </div>
  )
}

export default BidList

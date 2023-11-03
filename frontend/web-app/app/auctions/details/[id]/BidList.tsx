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
import { numberWithCommas } from '@/app/lib/numberWithComma'
import EmptyFilter from '@/app/components/EmptyFilter'
import BidForm from './BidForm'

type BidListProps = {
  user: User | null
  auction: Auction
}

function BidList({ auction, user }: BidListProps) {
  const [isLoading, setIsLoading] = useState(false)
  const bids = useBidStore((state) => state.bids)
  const setBids = useBidStore((state) => state.setBids)

  const highBid = bids.reduce(
    (prev, current) => (prev > current.amount ? prev : current.amount),
    0
  )

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
    <div className='rounded-lg shadow-md'>
      <div className='py-2 px-4 bg-white'>
        <div className='sticky top-0 bg-white p-2'>
          <Heading
            title={`Current high bid is $${numberWithCommas(highBid)}`}
          />
        </div>
      </div>

      <div className='overflow-auto h-[400px] flex flex-col-reverse px-2'>
        {bids.length === 0 ? (
          <EmptyFilter
            title='No bids for this item'
            subtitle='Please feel free to make a  bid'
          />
        ) : (
          <>
            {bids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>

      <div className='px-2 pb-2 text-gray-500'>
        {!user ? (
          <div className='flex items-center justify-center p-2 text-lg font-semibold'>
            Please login to make a bid
          </div>
        ) : user && user.username === auction.seller ? (
          <div className='flex items-center justify-center p-2 text-lg font-semibold'>
            You cannot bid on your own auction
          </div>
        ) : (
          <BidForm auctionId={auction.id} highBid={highBid} />
        )}
      </div>
    </div>
  )
}

export default BidList

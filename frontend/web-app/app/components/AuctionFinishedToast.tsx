import { Auction, AuctionFinished } from '@/models/auction'
import Image from 'next/image'
import Link from 'next/link'
import { numberWithCommas } from '../lib/numberWithComma'

type AuctionFinishedToastProps = {
  finishedAuction: AuctionFinished
  auction: Auction
}

function AuctionFinishedToast({
  finishedAuction,
  auction,
}: AuctionFinishedToastProps) {
  return (
    <Link
      href={`/auctions/details/${auction.id}`}
      className='flex flex-col items-center'
    >
      <div className='flex flex-row items-center gap-2'>
        <Image
          src={auction.imageUrl}
          alt='image'
          height={80}
          width={80}
          className='rounded-lg w-auto h-auto'
        />

        <div className='flex flex-col'>
          <span>
            Auction for {auction.make} {auction.model} has finished
          </span>

          {finishedAuction.itemSold && finishedAuction.amount ? (
            <p>
              Congras to {finishedAuction.winner} who has won this auction for
              $${numberWithCommas(finishedAuction.amount)}
            </p>
          ) : (
            <div>This item did not sell</div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default AuctionFinishedToast

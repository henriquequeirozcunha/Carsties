import { Auction } from '@/models/auction'
import Image from 'next/image'
import Link from 'next/link'

type AuctionCreatedToastProps = {
  auction: Auction
}

function AuctionCreatedToast({ auction }: AuctionCreatedToastProps) {
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

        <span>
          New Auciton! {auction.make} {auction.model} has beed added
        </span>
      </div>
    </Link>
  )
}

export default AuctionCreatedToast

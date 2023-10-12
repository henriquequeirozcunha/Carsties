import { Auction } from '@/models/auction'
import AuctionCard from './AuctionCard'
import { PaginatedResult } from '@/models/paginatedResult'

async function getData() : Promise<PaginatedResult<Auction>> {
    const res = await fetch('http://localhost:6001/search?pageSize=10')

    if (!res.ok) throw new Error('Failed to fetch data')

    return res.json()
}

async function Listings() {
    const data = await getData()

    return (
        <div className='grid grid-cols-4 gap-6'>
            {data && data.results.map((auction) => (
                <AuctionCard auction={auction} key={auction.id} />
            ))}
        </div>
    )
}

export default Listings
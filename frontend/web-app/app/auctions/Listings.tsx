'use client'

import AuctionCard from './AuctionCard'
import AppPagination from '../components/AppPagination'
import { useEffect, useState } from 'react'
import { Auction } from '@/models/auction'
import { getAuctions } from '../services/auction'
import Filters from './Filters'

function Listings() {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(4)

  useEffect(() => {
    getAuctions({ pageNumber, pageSize }).then((data) => {
      setAuctions(data.results)

      setPageCount(data.pageCount)
    })
  }, [pageNumber, pageSize])

  if (!auctions.length) return <h3>Loading...</h3>

  return (
    <>
      <Filters pageSize={pageSize} setPageSize={setPageSize} />
      <div className='grid grid-cols-4 gap-6'>
        {auctions &&
          auctions.map((auction) => (
            <AuctionCard auction={auction} key={auction.id} />
          ))}
      </div>

      <div className='flex  justify-center mt-4'>
        <AppPagination
          pageChanged={(page) => setPageNumber(page)}
          currentPage={1}
          pageCount={pageCount}
        />
      </div>
    </>
  )
}

export default Listings

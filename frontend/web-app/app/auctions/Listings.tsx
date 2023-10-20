'use client'

import AuctionCard from './AuctionCard'
import AppPagination from '../components/AppPagination'
import { useEffect, useState } from 'react'
import { Auction } from '@/models/auction'
import { getAuctions } from '../services/auction'
import Filters from './Filters'
import { PaginatedResult } from '@/models/paginatedResult'
import { useParamsStore } from '../hooks/useParamsStore'
import { shallow } from 'zustand/shallow'
import EmptyFilter from '../components/EmptyFilter'

function Listings() {
  const [data, setData] = useState<PaginatedResult<Auction>>()
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winer: state.winner,
    }),
    shallow
  )
  const setParams = useParamsStore((state) => state.setParams)

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber })
  }

  useEffect(() => {
    getAuctions(params).then((data) => {
      setData(data)
    })
  }, [params])

  if (!data) return <h3>Loading...</h3>

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className='grid grid-cols-4 gap-6'>
            {data.results &&
              data.results.map((auction) => (
                <AuctionCard auction={auction} key={auction.id} />
              ))}
          </div>

          <div className='flex  justify-center mt-4'>
            <AppPagination
              pageChanged={(page) => setPageNumber(page)}
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  )
}

export default Listings

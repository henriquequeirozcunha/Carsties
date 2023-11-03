'use client'

import AuctionCard from './AuctionCard'
import AppPagination from '../components/AppPagination'
import { useEffect, useState } from 'react'
import { getAuctions } from '../services/auction'
import Filters from './Filters'
import { useParamsStore } from '../hooks/useParamsStore'
import { shallow } from 'zustand/shallow'
import EmptyFilter from '../components/EmptyFilter'
import { useAuctionStore } from '../hooks/useAuctionStore'

function Listings() {
  const [loading, setLoading] = useState(true)

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

  const data = useAuctionStore(
    (state) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }),
    shallow
  )
  const setData = useAuctionStore((state) => state.setData)

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber })
  }

  useEffect(() => {
    getAuctions(params).then((data) => {
      setLoading(false)
      setData(data)
    })
  }, [params, setData])

  if (loading) return <h3>Loading...</h3>

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className='grid grid-cols-4 gap-6'>
            {data.auctions &&
              data.auctions.map((auction) => (
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

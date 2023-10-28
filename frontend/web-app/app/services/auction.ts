'use server'

import { Auction } from '@/models/auction'
import { PaginatedResult } from '@/models/paginatedResult'
import qs from 'query-string'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { FieldValues } from 'react-hook-form'

type getAuctionsDto = {
  pageNumber: number
  pageSize: number
}

export async function getAuctions(
  params: getAuctionsDto
): Promise<PaginatedResult<Auction>> {
  const queryParams = qs.stringifyUrl({ url: '', query: params })

  return await fetchWrapper.get(`search${queryParams}`)
}

export async function updateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 10000) + 1,
  }

  return await fetchWrapper.put(
    'auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c',
    data
  )
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post('auctions', data)
}

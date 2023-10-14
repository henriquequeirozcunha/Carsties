'use server'

import { Auction } from '@/models/auction'
import { PaginatedResult } from '@/models/paginatedResult'
import qs from 'query-string'

type getAuctionsDto = {
  pageNumber: number
  pageSize: number
}

export async function getAuctions(
  params: getAuctionsDto
): Promise<PaginatedResult<Auction>> {
  const queryParams = qs.stringifyUrl({ url: '', query: params })

  // const res = await fetch(
  //   `http://localhost:6001/search?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
  // )

  const res = await fetch(`http://localhost:6001/search${queryParams}`)

  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}

export async function updateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 10000) + 1,
  }

  const res = await fetch(
    'http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c',
    {
      method: 'PUT',
      headers: {},
      body: JSON.stringify(data),
    }
  )

  if (!res.ok) return { status: res.status, message: res.statusText }

  return res.statusText
}

'use server'

import { Auction } from '@/models/auction'
import { PaginatedResult } from '@/models/paginatedResult'
import qs from 'query-string'
import { getTokenWorkaround } from '../auctions/authActions'
import { fetchWrapper } from '@/lib/fetchWrapper'

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

  const token = await getTokenWorkaround()

  const res = await fetch(
    'http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c',
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token?.access_token}`,
      },
      body: JSON.stringify(data),
    }
  )

  if (!res.ok) return { status: res.status, message: res.statusText }

  return res.statusText
}

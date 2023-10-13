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

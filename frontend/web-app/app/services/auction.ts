'use server'

import { Auction } from '@/models/auction'
import { PaginatedResult } from '@/models/paginatedResult'

type getAuctionsDto = {
  pageNumber: number
  pageSize: number
}

export async function getAuctions(
  params: getAuctionsDto
): Promise<PaginatedResult<Auction>> {
  const res = await fetch(
    `http://localhost:6001/search?pageSize=${params.pageSize}&pageNumber=${params.pageNumber}`
  )

  if (!res.ok) throw new Error('Failed to fetch data')

  return res.json()
}

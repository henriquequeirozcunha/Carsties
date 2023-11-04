'use server'

import { Auction } from '@/models/auction'
import { PaginatedResult } from '@/models/paginatedResult'
import qs from 'query-string'
import { fetchWrapper } from '@/app/lib/fetchWrapper'
import { FieldValues } from 'react-hook-form'
import { revalidatePath } from 'next/cache'
import { Bid } from '@/models/bid'

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

export async function getDetailedViewData(id: string): Promise<Auction> {
  return await fetchWrapper.get(`auctions/${id}`)
}

export async function updateAuction(id: string, data: FieldValues) {
  const res = await fetchWrapper.put(`auctions/${id}`, data)

  revalidatePath(`auctions/${id}`)

  return res
}

export async function deleteAuction(id: string) {
  return await fetchWrapper.del(`auctions/${id}`)
}

export async function getBidsForAuction(id: string): Promise<Bid[]> {
  return await fetchWrapper.get(`bids/${id}`)
}

export async function placeBidForAuction(auctionId: string, amount: number) {
  return await fetchWrapper.post(
    `bids?auctionId=${auctionId}&amount=${amount}`,
    {}
  )
}

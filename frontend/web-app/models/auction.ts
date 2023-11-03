export type Auction = {
  id: string
  reservePrice: number
  seller: string
  winner?: string
  soldAmount: number
  currentHighBid: number
  createdAt: string
  updatedAt: string
  auctionEnd: string
  status: string
  make: string
  model: string
  year: string
  color: string
  mileage: number
  imageUrl: string
}

export type AuctionFinished = {
  itemSold: boolean
  auctionId: string
  winner?: string
  seller: string
  amount?: number
}

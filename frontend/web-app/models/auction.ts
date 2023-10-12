export type Auction = {
    id: string
    reserverPrice: number
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
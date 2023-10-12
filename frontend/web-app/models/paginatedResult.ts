export type PaginatedResult<T> = {
    results: T[]
    pageCount: number
    totalCount: number
}
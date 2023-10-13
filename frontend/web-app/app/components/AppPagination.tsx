'use client'

import { Pagination } from 'flowbite-react'
import { useState } from 'react'

type AppPaginationProps = {
  currentPage: number
  pageCount: number
  pageChanged: (page: number) => void
}

function AppPagination({
  currentPage,
  pageCount,
  pageChanged,
}: AppPaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      onPageChange={(page) => pageChanged(page)}
      totalPages={pageCount}
      layout='pagination'
      showIcons={true}
      className='text-blue-500 mb-5'
    />
  )
}

export default AppPagination

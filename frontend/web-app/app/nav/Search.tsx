'use client'

import { FaSearch } from 'react-icons/fa'
import { useParamsStore } from '../hooks/useParamsStore'
import { ChangeEvent, useState } from 'react'

enum KeyBoardCodes {
  enter = 'Enter',
}

function Search() {
  const setParams = useParamsStore((state) => state.setParams)
  const setSearchValue = useParamsStore((state) => state.setSearchValue)
  const searchValue = useParamsStore((state) => state.searchValue)

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value)
  }

  function search() {
    setParams({ searchTerm: searchValue })
  }

  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
      <input
        onKeyDown={(e) => {
          if (e.key === KeyBoardCodes.enter) {
            search()
          }
        }}
        value={searchValue}
        onChange={onChange}
        type='text'
        placeholder='Seacrh for cars by make, model or color'
        className='
            flex-grow
            pl-5
            bg-transparent
            focus:outline-none
            border-transparent
            focus:border-transparent
            focus:ring-0
            text-sm
            text-gray-600
            '
      />

      <button onClick={search}>
        <FaSearch
          className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'
          size={34}
        />
      </button>
    </div>
  )
}

export default Search

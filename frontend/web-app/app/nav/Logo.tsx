'use client'

import { AiOutlineCar } from 'react-icons/ai'
import { useParamsStore } from '../hooks/useParamsStore'

function Logo() {
  const reset = useParamsStore((state) => state.reset)

  return (
    <div
      onClick={reset}
      className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'
    >
      <AiOutlineCar size={34} />
      <div>Carsties Auctions</div>
    </div>
  )
}

export default Logo

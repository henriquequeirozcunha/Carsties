import { Button } from 'flowbite-react'
import { useParamsStore } from '../hooks/useParamsStore'

const pageSizeButtons = [4, 8, 12]

function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize)
  const setParams = useParamsStore((state) => state.setParams)

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>

        <Button.Group>
          {pageSizeButtons.map((value, index) => (
            <Button
              key={index}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? 'red' : 'gray'}`}
              className='focus:ring-0'
            >
              {value}
            </Button>
          ))}
        </Button.Group>
      </div>
    </div>
  )
}

export default Filters

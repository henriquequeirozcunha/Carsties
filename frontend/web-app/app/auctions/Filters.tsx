import { Button } from 'flowbite-react'
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup'

const pageSizeButtons = [4, 8, 12]

type FiltersProps = {
  pageSize: number
  setPageSize: (size: number) => void
}

function Filters({ pageSize, setPageSize }: FiltersProps) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Page size</span>

        <ButtonGroup>
          {pageSizeButtons.map((value, index) => (
            <Button
              key={index}
              onClick={() => setPageSize(value)}
              color={`${pageSize === value ? 'red' : 'gray'}`}
              className='focus:ring-0'
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Filters

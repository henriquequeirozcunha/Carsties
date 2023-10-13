import { Button } from 'flowbite-react'
import { OrderByOptions, useParamsStore } from '../hooks/useParamsStore'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai'
import { BsFillStopCircleFill } from 'react-icons/bs'
import { IconType } from 'react-icons'

const pageSizeButtons = [4, 8, 12]

type OrderButton = {
  label: string
  icon: IconType
  value: string
}

const orderButtons: OrderButton[] = [
  {
    label: 'Alphabetical',
    icon: AiOutlineSortAscending,
    value: OrderByOptions.make,
  },
  {
    label: 'End date',
    icon: AiOutlineClockCircle,
    value: OrderByOptions.endingSoon,
  },
  {
    label: 'Recently added',
    icon: BsFillStopCircleFill,
    value: OrderByOptions.new,
  },
]

function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize)
  const setParams = useParamsStore((state) => state.setParams)
  const orderBy = useParamsStore((state) => state.orderBy)

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Order by</span>

        <Button.Group>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value}` ? 'red' : 'gray'}
            >
              <Icon className='mr-3 h-4 w-4' />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>
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

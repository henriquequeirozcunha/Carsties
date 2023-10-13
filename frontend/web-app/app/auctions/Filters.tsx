import { Button } from 'flowbite-react'
import {
  FilterByOptions,
  OrderByOptions,
  useParamsStore,
} from '../hooks/useParamsStore'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai'
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs'
import { IconType } from 'react-icons'
import { GiFinishLine, GiFlame } from 'react-icons/gi'

const pageSizeButtons = [4, 8, 12]

type ActionButton = {
  label: string
  icon: IconType
  value: string
}

const orderButtons: ActionButton[] = [
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

const filterButtons: ActionButton[] = [
  {
    label: 'Live Auctions',
    icon: GiFlame,
    value: FilterByOptions.live,
  },
  {
    label: 'Ending < 6 hours',
    icon: GiFinishLine,
    value: FilterByOptions.endingSoon,
  },
  {
    label: 'Completed',
    icon: BsStopwatchFill,
    value: FilterByOptions.finished,
  },
]

function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize)
  const setParams = useParamsStore((state) => state.setParams)
  const orderBy = useParamsStore((state) => state.orderBy)
  const filterBy = useParamsStore((state) => state.filterBy)

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Filter by</span>

        <Button.Group>
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value}` ? 'red' : 'gray'}
            >
              <Icon className='mr-3 h-4 w-4' />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>
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

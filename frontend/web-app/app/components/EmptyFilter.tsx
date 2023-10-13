import { Button } from 'flowbite-react'
import { useParamsStore } from '../hooks/useParamsStore'
import Heading from './Heading'

type EmptyFilterProps = {
  title?: string
  subtitle?: string
  showReset?: boolean
}

function EmptyFilter({
  title = 'No matches for this filter',
  subtitle = 'Try chaging or resertting the filter',
  showReset,
}: EmptyFilterProps) {
  const reset = useParamsStore((state) => state.reset)

  return (
    <div className='h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg'>
      <Heading title={title} subtitle={subtitle} center />

      <div className='mt-4'>
        {showReset && (
          <Button outline onClick={reset}>
            Remove Filters
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmptyFilter

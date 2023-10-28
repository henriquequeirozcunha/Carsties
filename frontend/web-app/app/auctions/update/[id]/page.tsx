import Heading from '@/app/components/Heading'
import AuctionForm from '../../AuctionForm'
import { getDetailedViewData } from '@/app/services/auction'

type UpdateProps = {
  id: string
}

async function Update({ params }: { params: UpdateProps }) {
  const data = await getDetailedViewData(params.id)

  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <Heading
        title='Update your action'
        subtitle='Please update the details of your car'
      />

      <AuctionForm auction={data} />
    </div>
  )
}

export default Update

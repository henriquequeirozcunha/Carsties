'use client'

import { Button } from 'flowbite-react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input'
import { useEffect } from 'react'
import DateInput from '../components/DateInput'
import { createAuction } from '../services/auction'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast/headless'

type CreateAuctionDto = {
  make: string
  model: string
  year: number
  color: string
  mileage: string
  reservePrice: number
  auctionEnd: Date
}

function AuctionForm() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onTouched',
  })

  useEffect(() => {
    setFocus('make')
  }, [setFocus])

  async function onSubmit(data: FieldValues) {
    try {
      const res = await createAuction(data)

      if (res.error) {
        throw res.error
      }

      router.push(`/auctions/details/${res.id}`)
    } catch (error: any) {
      console.log('aaa', error)
      toast.error(error.status + '' + error.message)
    }
  }

  return (
    <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Make'
        name='name'
        control={control}
        rules={{ required: 'Make is required' }}
      />
      <Input
        label='Model'
        name='model'
        control={control}
        rules={{ required: 'Model is required' }}
      />

      <Input
        label='Color'
        name='color'
        control={control}
        rules={{ required: 'Color is required' }}
      />

      <div className='grid grid-cols-2 gap-3'>
        <Input
          label='Year'
          name='year'
          type='number'
          control={control}
          rules={{ required: 'Year is required' }}
        />

        <Input
          label='Mileage'
          name='milage'
          type='number'
          control={control}
          rules={{ required: 'Mileage is required' }}
        />
      </div>

      <Input
        label='Image URL'
        name='imageUrl'
        control={control}
        rules={{ required: 'Image Url is required' }}
      />

      <div className='grid grid-cols-2 gap-3'>
        <Input
          label='Reserve Price (enter 0 if no reserve)'
          name='reservePrice'
          type='number'
          control={control}
          rules={{ required: 'Reserve Price is required' }}
        />

        <DateInput
          label='Auction end date/time'
          name='auctionEnd'
          control={control}
          dateFormat='dd MMMM yyyy h:mm a'
          showTimeSelect
          rules={{ required: 'Auction end date is required' }}
        />
      </div>

      <div className='flex justify-between'>
        <Button outline color='gray'>
          Cancel
        </Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type='submit'
          outline
          color='success'
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default AuctionForm

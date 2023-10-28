'use client'

import { Button } from 'flowbite-react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input'
import { useEffect } from 'react'
import DateInput from '../components/DateInput'
import { createAuction, updateAuction } from '../services/auction'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast/headless'
import { Auction } from '@/models/auction'

type AuctionFormProps = {
  auction?: Auction
}

function AuctionForm({ auction }: AuctionFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onTouched',
  })

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction

      reset({ make, model, color, mileage, year })
    }

    setFocus('make')
  }, [auction, reset, setFocus])

  async function onSubmit(data: FieldValues) {
    try {
      let id = ''
      let res

      if (pathname === '/auctions/create') {
        res = await createAuction(data)

        id = res.id
      } else {
        if (auction) {
          res = await updateAuction(auction.id, data)
          id = auction.id
        }
      }

      if (res.error) {
        throw res.error
      }

      router.push(`/auctions/details/${id}`)
    } catch (error: any) {
      console.log('aaa', error)
      toast.error(error.status + '' + error.message)
    }
  }

  return (
    <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Make'
        name='make'
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
          name='mileage'
          type='number'
          control={control}
          rules={{ required: 'Mileage is required' }}
        />
      </div>

      {pathname === '/auctions/create' && (
        <>
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
        </>
      )}

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

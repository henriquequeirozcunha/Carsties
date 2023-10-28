'use client'

import { deleteAuction } from '@/app/services/auction'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

type DeleteButtonProps = {
  id: string
}

function DeleteButton({ id }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleDelete() {
    setLoading(true)
    deleteAuction(id)
      .then((res) => {
        if (res.error) {
          throw res.error
        }

        router.push('/')
      })
      .catch((error) => {
        toast.error(`${error.status} ${error.message}`)
      })
      .finally(() => setLoading(true))
  }

  return (
    <Button
      color='failure'
      outline
      isProcessing={loading}
      onClick={handleDelete}
    >
      Delete Auction
    </Button>
  )
}

export default DeleteButton

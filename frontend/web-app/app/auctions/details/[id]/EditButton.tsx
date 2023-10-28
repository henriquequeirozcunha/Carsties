'use client'

import { Button } from 'flowbite-react'
import Link from 'next/link'

type EditButtonProps = {
  id: string
}

function EditButton({ id }: EditButtonProps) {
  return (
    <Button outline>
      <Link href={`/auctions/update/${id}`}>Update Auction</Link>
    </Button>
  )
}

export default EditButton

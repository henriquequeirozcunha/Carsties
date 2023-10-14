import React from 'react'
import { getSession } from '../auctions/authActions'
import Heading from '../components/Heading'

async function Session() {
  const session = await getSession()

  return (
    <div>
      <Heading title='Session dashboard' />

      <div className='bg-blue-200 border-2 border-blue-500'>
        <h3 className='text-lg'>Session Data</h3>

        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Session

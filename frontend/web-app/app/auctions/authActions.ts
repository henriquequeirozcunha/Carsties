import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  try {
    const session = await getSession()

    console.log('session', session)

    if (!session) return null

    return session.user
  } catch (error) {
    console.log('error', error)

    return null
  }
}

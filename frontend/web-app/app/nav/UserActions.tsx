'use client'

import { Dropdown } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi2'
import { useParamsStore } from '../hooks/useParamsStore'

type UserActionsProps = {
  user: User
}

function UserActions({ user }: UserActionsProps) {
  const router = useRouter()
  const pathName = usePathname()
  const setParams = useParamsStore((state) => state.setParams)

  function setWinner() {
    setParams({ winner: user.username, seller: undefined })

    if (pathName !== '/') {
      router.push('/')
    }
  }

  function setSeller() {
    setParams({ seller: user.username, winner: undefined })

    if (pathName !== '/') {
      router.push('/')
    }
  }

  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
        Auctions won
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillCar}>
        <Link href='/auctions/create'>Sell my car</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={HiCog}>
        <Link href='/session'>Session(dev only)</Link>
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}

export default UserActions

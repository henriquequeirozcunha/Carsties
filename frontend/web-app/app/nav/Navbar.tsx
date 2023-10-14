import Search from './Search'
import Logo from './Logo'
import LoginButton from './LoginButton'
import { getCurrentUser } from '../auctions/authActions'
import UserActions from './UserActions'

async function Navbar() {
  //const { data, status } = useSession() MUST BE WRAPED BY SESSIONPROVIDER

  const user = await getCurrentUser()

  return (
    <header
      className='
        sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md
        '
    >
      <Logo />
      <Search />
      {user ? <UserActions /> : <LoginButton />}
    </header>
  )
}

export default Navbar

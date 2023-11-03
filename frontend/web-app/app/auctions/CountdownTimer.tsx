'use client'

import Countdown, { zeroPad } from 'react-countdown'
import { useBidStore } from '../hooks/useBidStore'
import { usePathname } from 'next/navigation'

type CountdownTimerProps = {
  auctionEnd: string
}

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <div
      className={`
            border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center
            ${
              completed
                ? 'bg-red-600'
                : days === 0 && hours < 10
                ? 'bg-amber-600'
                : 'bg-green-600'
            }
            `}
    >
      {completed ? (
        <span>Auction finished</span>
      ) : (
        <span suppressHydrationWarning={true}>
          {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      )}
    </div>
  )
}

function CountdownTimer({ auctionEnd }: CountdownTimerProps) {
  const setOpen = useBidStore((state) => state.setOpen)
  const pathname = usePathname()

  function auctionFinished() {
    if (pathname.startsWith('/auctions/details')) {
      setOpen(false)
    }
  }

  return (
    <div>
      <Countdown
        date={auctionEnd}
        renderer={renderer}
        onComplete={auctionFinished}
      />
    </div>
  )
}

export default CountdownTimer

import Image from 'next/image'
import CountdownTimer from './timer';

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <CountdownTimer targetTime={100000000} />
    </div>
  )
}

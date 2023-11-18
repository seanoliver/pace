import Image from 'next/image'
import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <CountdownTimer targetTime={10*1000} />
    </div>
  )
}

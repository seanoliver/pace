import React, { useState } from 'react'
import { Input } from './ui/input'

const NumberFormatter: React.FC = () => {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update hours state and validate
    setHours(formatTimePart(event.target.value, 23))
  }

  const handleMinuteSecondChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'minutes' | 'seconds',
  ) => {
    // Update minutes or seconds state and validate
    const value = formatTimePart(event.target.value, 59)
    type === 'minutes' ? setMinutes(value) : setSeconds(value)
  }

  const formatTimePart = (inputValue: string, max: number) => {
    // Format to two digits and validate
    let value = parseInt(inputValue, 10)
    if (isNaN(value) || value < 0) {
      value = 0
    } else if (value > max) {
      value = max
    }
    return value.toString().padStart(2, '0')
  }

  // Keyboard event handling for incrementing and decrementing values
  // ...

  const inputClasses = 'w-16 text-center'

  return (
    <div className="flex">
      <Input
        type="text"
        value={hours}
        placeholder="HH"
        onChange={handleHourChange}
        className={inputClasses}
        // Additional props for keyboard event handling
      />
      <Input
        type="text"
        value={minutes}
        placeholder="MM"
        className={inputClasses}
        onChange={(e) => handleMinuteSecondChange(e, 'minutes')}
        // Additional props for keyboard event handling
      />
      <Input
        type="text"
        value={seconds}
        placeholder="SS"
        className={inputClasses}
        onChange={(e) => handleMinuteSecondChange(e, 'seconds')}
        // Additional props for keyboard event handling
      />
    </div>
  )
}

export default NumberFormatter

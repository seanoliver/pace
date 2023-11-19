import React, { useState } from 'react';
import { Input } from './ui/input';

const NumberFormatter: React.FC = () => {
  const [value, setValue] = useState('');

  const formatInput = (inputValue: string) => {
    // Remove non-digit characters
    const numbersOnly = inputValue.replace(/\D/g, '');

    // Split into pairs of two digits and join with ' : '
    return numbersOnly.match(/.{1,2}/g)?.join(' : ') || '';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatInput(event.target.value));
  };

  return (
    <Input type="text" value={value} onChange={handleChange} />
  );
};

export default NumberFormatter;
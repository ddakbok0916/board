'use client';

import { FetchClient } from '@/lib/FetchClient';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function MainPage () {
  const [num, setNum] = useState(0);
  const [test, setTest] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const response = await FetchClient('/api/main/list', { method: 'GET' });
      console.log('🚀 ~ useEffect ~ response:', response);
    };
    fetch();
  }, []);

  const handleUp = () => {
    setNum(() => num + 1);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-md' onClick={handleUp}>
        {num}
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md' onClick={() => setTest(() => test + 1)}>
        {test}
      </div>
    </div>
  );
}

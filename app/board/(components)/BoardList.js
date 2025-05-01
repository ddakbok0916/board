'use client';

import { FetchClient } from '@/lib/FetchClient';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function BoardList () {
  const [boardList, setBoardList] = useState([]);



  useEffect(() => {
    const fetch = async () => {
      const response = await FetchClient('/api/main/list', { method: 'GET' });
      console.log('🚀 ~ useEffect ~ response:', response);
      setBoardList(response);
    };
    fetch();
  }, []);
  

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
  
    </div>
  );
}

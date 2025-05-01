'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import MainPage from './MainPage';
export default function Page () {
  const router = useRouter();

  return (
    <>
      <MainPage/>
      {/* <button className='bg-orange-500' onClick={() => router.push('/planer')}>
        플래너 이동
      </button> */}
    </>
  );
}

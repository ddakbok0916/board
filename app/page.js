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
    </>
  );
}

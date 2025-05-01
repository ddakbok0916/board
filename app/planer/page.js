'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import Planer from './Planer';
export default function Page () {

  const router = useRouter()

  return (
    <>
      <Planer/>
    </>
  );
}

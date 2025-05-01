'use client';

import { FetchClient } from '@/lib/FetchClient';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function BoardList() {
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
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white p-4 shadow">
        <h1 className="text-center text-2xl font-bold">게시판</h1>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto flex-1 p-6">
        <div className="grid grid-cols-1 gap-6">
          {boardList.map((item, index) => {
            return <Card item={item} />;
          })}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-white p-4 text-center text-sm shadow">© 2025 MyBoard. All rights reserved.</footer>
    </div>
  );
}

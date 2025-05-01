'use client';

import { FetchClient } from '@/lib/FetchClient';
import dayjs from 'dayjs';
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
    {/* 헤더 */}
    <header className="bg-white shadow p-4">
      <h1 className="text-2xl font-bold text-center">게시판</h1>
    </header>

    {/* 메인 컨텐츠 */}
    <main className="flex-1 container mx-auto p-6">
      <div className="grid gap-6 grid-cols-1">
        {/* 임시 하드코딩 카드 */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-full">
          <h3 className="text-xl font-semibold mb-2 truncate">
            ㅁㄴㅇㅁㄴㅇㅇ
          </h3>
          <p className="text-sm text-gray-500 mb-1">
            작성자: ㅋㅌㅊㅊ
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {dayjs('2025-10-21').format('YYYY.MM.DD')}
          </p>
          <hr className="border-t border-gray-200 my-2" />
          <div className="mt-auto flex justify-end">
            <button
              onClick={() => onView(123)}
              className="inline-flex items-center space-x-1 px-4 py-2 border rounded-2xl hover:bg-gray-100"
            >
              <span>자세히 보기</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </main>

    {/* 푸터 */}
    <footer className="bg-white shadow p-4 text-center text-sm">
      © 2025 MyBoard. All rights reserved.
    </footer>
  </div>
  );
}

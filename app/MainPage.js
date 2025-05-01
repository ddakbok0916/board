'use client';

import { FetchClient } from '@/lib/FetchClient';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function MainPage() {
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  // 닉네임 인증 처리
  const handleAuth = async () => {
    try {
      const response = await FetchClient('/login', {
        method: 'POST',
        body: JSON.stringify({ nickname }),
      });

      const userData = response;
      setUser(userData.user); // 인증된 사용자 정보 저장
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      const response = await FetchClient('/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

   // Enter 키 입력 처리
   const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  // 인증된 상태 화면
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">환영합니다, {user.nickname}님!</h1>
          <div className="flex justify-center space-x-4">
            {/* 플래너 이동 버튼 */}
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              onClick={() => router.push('/planer')}
            >
              플래너 이동
            </button>
            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 인증되지 않은 상태 화면
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">닉네임으로 로그인</h1>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="닉네임을 입력하세요"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          인증하기
        </button>
      </div>
    </div>
  );
}

'use client';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function Card({ item }) {
  const router = useRouter();
  return (
    <div key={item.id} className="flex h-full flex-col rounded-2xl bg-white p-4 shadow">
      <h3 className="mb-2 truncate text-xl font-semibold">{item.title}</h3>
      <p className="text-md mb-1 text-gray-800">{item.contents}</p>
      <p className="mb-1 text-sm text-gray-500">작성자: {item.id}</p>
      <p className="mb-4 text-sm text-gray-500">{dayjs(item.created_at).format('YYYY.MM.DD')}</p>
      <hr className="my-2 border-t border-gray-200" />
      <div className="mt-auto flex justify-end">
        <button
          className="inline-flex items-center space-x-1 rounded-2xl border px-4 py-2 hover:bg-gray-100"
          onClick={() => {
            router.push(`/board/${item.id}`);
          }}
        >
          <span>자세히 보기</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

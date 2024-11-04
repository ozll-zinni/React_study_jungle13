// src/app/page.tsx
'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { postAtom } from './atom';
import { useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useAtom(postAtom);

  // JSON 파일에서 데이터를 가져오는 함수
  const fetchPosts = async () => {
    try {
      const response = await fetch('/db.json'); // public 디렉토리의 db.json 파일 경로
      const data = await response.json();
      setPosts(data.posts); // 가져온 데이터를 Jotai 상태로 설정
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  useEffect(() => {
    // posts가 비어 있을 때만 fetch 실행
    if (!posts || posts.length === 0) {
      fetchPosts();
    }
  }, [posts, setPosts]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#2d4356]">Board list</h2>
      
      <p className="text-sm text-gray-600 mb-4">Total post : {posts ? posts.length : 0}</p>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left w-20">No</th>
            <th className="py-2 text-left">Title</th>
            <th className="py-2 text-right w-32">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts
            .map((post: any, index: number) => (
              <tr key={`${post.id}-${index}`} className="border-b hover:bg-gray-50">
                <td className="py-3">{index + 1}</td>
                <td className="py-3">
                  <Link href={`/read/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </td>
                <td className="py-3 text-right">
                  {post.created_at ? 
                    new Date(post.created_at).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }) 
                    : new Date().toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  }
                </td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </div>
  );
}

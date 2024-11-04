'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { postAtom } from './atom';
import { useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useAtom(postAtom);

  const fetchPosts = async () => {
    const response = await fetch('/db.json'); // public 디렉토리의 db.json 파일 경로
    const data = await response.json();
    setPosts(data.posts); // 가져온 데이터로 postAtom 설정
  };

  useEffect(() => {
    if (!posts || posts.length === 0) {
      fetchPosts(); // posts가 없을 때만 fetch 실행
    }
  }, [posts, setPosts]);

  return (
    <div className="board-list">
      <h2 className="board-title">Board list</h2>
      
      <p className="post-count">Total post: {posts ? posts.length : 0}</p>
      <table className="post-table">
        <thead>
          <tr>
            <th className="post-header no-col">No</th>
            <th className="post-header title-col">Title</th>
            <th className="post-header date-col">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts
            .map((post: any, index: number) => (
              <tr key={`${post.id}-${index}`} className="post-row">
                <td className="post-data">{index + 1}</td>
                <td className="post-data">
                  <Link href={`/read/${post.id}`} className="post-link">
                    {post.title}
                  </Link>
                </td>
                <td className="post-data">
                  {post.created_at 
                    ? new Date(post.created_at).toLocaleDateString("ko-KR", {
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

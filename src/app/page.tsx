'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { postAtom } from './atom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useAtom(postAtom);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/db.json');
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (!posts || posts.length === 0) {
      fetchPosts();
    }
  }, [posts, setPosts]);

  const groupedPosts = {
    'Not Started': posts.filter(post => post.status === 'Not Started'),
    'In Progress': posts.filter(post => post.status === 'In Progress'),
    'Done': posts.filter(post => post.status === 'Done')
  };

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <h2 className="board-title">Not Started ({groupedPosts['Not Started'].length})</h2>
        {groupedPosts['Not Started'].map((post) => (
          <div key={post.id} className="kanban-card">
            <Link href={`/read/${post.id}`} className="post-link">
              {post.title}
            </Link>
          </div>
        ))}
        <button className="write-button" onClick={() => router.push('/create?status=Not%20Started')}>Write</button>
      </div>

      <div className="kanban-column">
        <h2 className="board-title">In Progress ({groupedPosts['In Progress'].length})</h2>
        {groupedPosts['In Progress'].map((post) => (
          <div key={post.id} className="kanban-card">
            <Link href={`/read/${post.id}`} className="post-link">
              {post.title}
            </Link>
          </div>
        ))}
        <button className="write-button" onClick={() => router.push('/create?status=In%20Progress')}>Write</button>
      </div>

      <div className="kanban-column">
        <h2 className="board-title">Done ({groupedPosts['Done'].length})</h2>
        {groupedPosts['Done'].map((post) => (
          <div key={post.id} className="kanban-card">
            <Link href={`/read/${post.id}`} className="post-link">
              {post.title}
            </Link>
          </div>
        ))}
        <button className="write-button" onClick={() => router.push('/create?status=Done')}>Write</button>
      </div>
    </div>
  );
}
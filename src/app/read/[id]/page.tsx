'use client';

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { postAtom } from "@/app/atom";

export default function Read() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useAtom(postAtom);

  useEffect(() => {
    // posts에서 id에 해당하는 게시물을 찾아 설정
    const foundPost = posts?.find((p) => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [id, posts]);

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        // postAtom에서 해당 게시물 제거
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== id));

        // 목록 페이지로 이동
        router.push('/');
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <>
      <h2 className="text-2xl text-[#2d4356] mb-8">{post.title}</h2>
      
      <div className="mb-8 min-h-[100px]">
        <p>{post.content}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link 
          href={`/update/${id}`} 
          className="modify-button"
        >
          Modify
        </Link>
        
        <button 
          onClick={handleDelete} 
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </>
  );
}

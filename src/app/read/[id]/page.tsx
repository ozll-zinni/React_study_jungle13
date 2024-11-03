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
    async function fetchPost() {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
          cache: 'no-store'
        });
        if (!resp.ok) throw new Error(`Failed to fetch post, status: ${resp.status}`);
        const data = await resp.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to delete post');
        
        // postAtom에서 삭제된 게시물을 필터링하여 상태 업데이트
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
          className="bg-[#6c7a89] text-white py-2 rounded hover:bg-[#5c6a79] transition-colors text-center"
        >
          Modify
        </Link>
        
        <button 
          onClick={handleDelete} 
          className="bg-[#FFA7AF] text-white py-2 rounded hover:bg-[#FF8C9A] transition-colors flex-1"
        >
          Delete
        </button>
      </div>
    </>
  );
}

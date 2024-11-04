'use client';
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { postAtom } from "@/app/atom";

export default function Update() {
  const router = useRouter();
  const params = useParams();  
  const id = params.id;

  const [post, setPost] = useAtom(postAtom); 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, { cache: 'no-cache' });
        if (!resp.ok) throw new Error("Failed to fetch post");
        const post = await resp.json();
        setTitle(post.title);
        setBody(post.body);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <form 
      onSubmit={async (evt) => {
        evt.preventDefault();
        try {
          const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content: body }),
          });
          if (!resp.ok) {
            alert(`업데이트에 실패했습니다. 오류 코드: ${resp.status}`);
            return;
          }
          const updatedPost = await resp.json();
          setPost((prevPosts) => prevPosts.map((post) => (post.id === id ? updatedPost : post)));
          router.push(`/read/${id}`);
          router.refresh();
        } catch (error) {
          console.error("Failed to update post:", error);
          alert("업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }}
    >
      <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="body" value={body} onChange={e => setBody(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}

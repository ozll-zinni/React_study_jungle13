'use client';

import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';

export default function Read() {
  const params = useParams();  // React.use() 제거
  const id = params.id;

  const [post, setPost] = useState<{ title: string; user_name: string; created_at: string; } | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
        cache: 'no-store'
      });
      const data = await resp.json();
      setPost(data);
    }

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <h2>{post.title}</h2>
      <h2>{post.user_name}</h2>
      <p>{post.created_at}</p>
    </>
  );
}
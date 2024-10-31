'use client';

import { useParams } from "next/navigation";
import React, { useEffect } from 'react';
import { useAtom } from "jotai";
import { postAtom } from "@/app/atom";

export default function Read() {
  const params = useParams(); 
  const id = params.id;
  const [post, setPost] = useAtom(postAtom);

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
  }, [id, post, setPost]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <h2>{post.title}</h2>
      <h2>{post.user_name}</h2>
      <p>{post.created_at}</p>
      <p>{post.content}</p>
    </>
  );
}
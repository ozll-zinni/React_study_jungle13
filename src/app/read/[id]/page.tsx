'use client';

import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { useAtom } from "jotai";
import { postAtom } from "@/app/atom";

export default function Read() {
  const { id } = useParams();
  const [posts] = useAtom(postAtom);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
          cache: 'no-store'
        });
        if (!resp.ok) throw new Error('Failed to fetch topic');
        const data = await resp.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching topic:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, post, setPost]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>

  return (
    <>
      <h2>{post.title}</h2>
      <h2>{post.user_name}</h2>
      <p>{post.created_at}</p>
      <p>{post.content}</p>
    </>
  );
}
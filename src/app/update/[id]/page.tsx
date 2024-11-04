'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { postAtom } from "@/app/atom";

export default function Update() {
  const router = useRouter();
  const params = useParams();  
  const id = typeof params.id === 'string' ? params.id : '';

  const [posts, setPosts] = useAtom(postAtom); 
  const [title, setTitle] = useState<string>(''); // 초기값을 빈 문자열로 설정
  const [content, setContent] = useState<string>(''); // 초기값을 빈 문자열로 설정

  useEffect(() => {
    const post = posts?.find((p) => p.id === id);
    if (post) {
      setTitle(post.title ?? ''); // title이 undefined일 경우 빈 문자열로 설정
      setContent(post.content ?? ''); // content가 undefined일 경우 빈 문자열로 설정
    }
  }, [id, posts]);

  const handleUpdate = (evt: React.FormEvent) => {
    evt.preventDefault();
    const updatedPost = { id, title, content };

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post))
    );

    router.push(`/read/${id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      <textarea
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea-field"
      />
      <button type="submit" className="submit-button">Update</button>
    </form>
  );
}

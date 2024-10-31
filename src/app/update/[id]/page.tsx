'use client';
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAtom } from "jotai";
import { postAtom } from "@/app/atom";

export default function Update() {
  const router = useRouter();
  const params = useParams();  
  const id = params.id;

  const [post, setPost] = useAtom(postAtom);
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.content || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchTopic() {
      if (!id) return;

      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, { cache: 'no-cache' });
      const data = await resp.json();
      setPost(data);
      setTitle(data.title);
      setBody(data.content);
    }

    fetchTopic();
  }, [id, setPost]);

  return (
    <form onSubmit={async (evt) => {
      evt.preventDefault();

      if (!password) {
        alert("비밀번호를 입력하세요.");
        return;
      }

      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: id,   
          title,            
          content: body,     
          user_password: password,
        }),
      });

      if (resp.ok) {
        const updatedPost = await resp.json();
        setPost(updatedPost);
        router.push(`/read/${id}`);
        router.refresh();
      } else {
        console.error("Failed to update post");
      }
    }}>
      <h2>Update</h2>
      <p>
        <input 
          type="text" 
          name="title" 
          placeholder="title" 
          onChange={e => setTitle(e.target.value)} 
          value={title} 
        />
      </p>
      <p>
        <textarea 
          name="body" 
          placeholder="body" 
          onChange={e => setBody(e.target.value)} 
          value={body} 
        />
      </p>
      <p>
        {/* 비밀번호 입력 필드 추가 */}
        <input 
          type="password" 
          placeholder="비밀번호 입력" 
          onChange={e => setPassword(e.target.value)} 
          value={password} 
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
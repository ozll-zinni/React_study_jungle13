'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useAtom } from 'jotai';
import { postAtom } from "../atom";
import { Post } from "@/app/atom";
import { v4 as uuidv4 } from 'uuid';
import { Suspense, useState, useEffect } from 'react';

export default function Create() {
  const router = useRouter();
  const [posts, setPost] = useAtom(postAtom);

  const handleSubmit = (evt: React.FormEvent, statusParam: 'Not Started' | 'In Progress' | 'Done') => {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;

    const title = (target.elements.namedItem('title') as HTMLInputElement).value;
    const content = (target.elements.namedItem('content') as HTMLTextAreaElement).value;

    if (title.length < 10) {
      alert("제목은 10글자 이상이어야 합니다.");
      return;
    }

    if (!content) {
      alert("상세 내용을 작성해주세요.");
      return;
    }

    const createdDate = new Date().toISOString();
    const newPost: Post = { 
      id: uuidv4(),
      title,
      content,
      created_at: createdDate,
      status: statusParam,
    };

    setPost((prevPosts) => [...prevPosts, newPost]);

    router.push(`/read/${newPost.id}`);
    router.refresh();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatusForm onSubmit={handleSubmit} />
    </Suspense>
  );
}

function StatusForm({ onSubmit }: { onSubmit: (evt: React.FormEvent, statusParam: 'Not Started' | 'In Progress' | 'Done') => void }) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') as 'Not Started' | 'In Progress' | 'Done' || 'Not Started';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAlert = (evt: React.FormEvent) => {
    evt.preventDefault();
  
    if (!title && !content) {
      alert("모든 필드를 작성해 주세요.");
    } else if (!title) {
      alert("제목을 작성해 주세요.");
    } else if (!content) {
      alert("상세 내용을 작성해 주세요.");
    } else {
      onSubmit(evt, statusParam);
    }
  };

  return (
    <form onSubmit={handleAlert}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">ToDo</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          className="input-field" 
          placeholder="할일을 작성해주세요" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content" className="form-label">Detail</label>
        <textarea 
          id="content" 
          name="content" 
          className="textarea-field" 
          placeholder="상세 내용" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="button-container">
        <button type="submit" className="write-button">
          Write
        </button>
      </div>
    </form>
  );
}

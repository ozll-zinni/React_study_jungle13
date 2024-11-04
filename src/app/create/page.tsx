'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useAtom } from 'jotai';
import { postAtom } from "../atom";
import { Post } from "@/app/atom";
import { v4 as uuidv4 } from 'uuid';
import { Suspense } from 'react';

export default function Create() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') as 'Not Started' | 'In Progress' | 'Done' || 'Not Started';
  const [posts, setPost] = useAtom(postAtom);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;

    const title = (target.elements.namedItem('title') as HTMLInputElement).value;
    const content = (target.elements.namedItem('content') as HTMLTextAreaElement).value;

    if (title.length < 10) {
      alert("제목은 10글자 이상이어야 합니다.");
      return;
    }

    const createdDate = new Date().toISOString();
    const newPost: Post = { 
      id: uuidv4(),
      title,
      content,
      created_at: createdDate,
      status: statusParam, // 전달된 쿼리 파라미터에서 상태를 가져옴
    };

    setPost((prevPosts) => [...prevPosts, newPost]);

    router.push(`/read/${newPost.id}`);
    router.refresh();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">ToDo</label>
          <input type="text" id="title" name="title" className="input-field" placeholder="할일을 작성해주세요" />
        </div>
        
        <div className="form-group">
          <label htmlFor="content" className="form-label">Detail</label>
          <textarea id="content" name="content" className="textarea-field" placeholder="상세 내용"></textarea>
        </div>

        <div className="button-container">
          <button type="submit" className="write-button">Write</button>
        </div>
      </form>
    </Suspense>
  );
}

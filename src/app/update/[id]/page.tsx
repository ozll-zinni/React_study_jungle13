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
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<'Not Started' | 'In Progress' | 'Done'>('Not Started');

  useEffect(() => {
    const post = posts?.find((p) => p.id === id);
    if (post) {
      setTitle(post.title ?? '');
      setContent(post.content ?? '');
      setStatus(post.status ?? 'Not Started');
    }
  }, [id, posts]);

  const handleUpdate = (evt: React.FormEvent) => {
    evt.preventDefault();
    const updatedPost = { id, title, content, status };

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post))
    );

    router.push(`/read/${id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">ToDo</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content" className="form-label">Detail</label>
        <textarea
          id="content"
          name="content"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
        />
      </div>

      <div className="status-update-container">
        <select value={status} onChange={(e) => setStatus(e.target.value as 'Not Started' | 'In Progress' | 'Done')}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="modify-button">Update</button>
      </div>
    </form>
  );
}

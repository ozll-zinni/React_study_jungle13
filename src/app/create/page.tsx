'use client';

import { useRouter } from "next/navigation";
import { useAtom } from 'jotai';
import { postAtom } from "../atom";

export default function Create() {
  const router = useRouter();
  const [posts, setPost] = useAtom(postAtom);

  return (
    <form onSubmit={async (evt) => {
      evt.preventDefault();
      const title = evt.target.title.value;
      const content = evt.target.content.value;
      const user_name = evt.target.user_name.value;
      const user_password = evt.target.user_password.value;

      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, user_name, user_password }),
        });
        
        if (!resp.ok) throw new Error('Failed to create post');
        
        const newPost = await resp.json();
        
        const formattedPost = {
          _id: newPost.id,
          title,
          content,
          user_name,
          created_at: new Date().toISOString(),
        };

        setPost(prevPosts => [...prevPosts, formattedPost]);
        
        const updatedPostsResp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/list`);
        const updatedPosts = await updatedPostsResp.json();
        setPost(updatedPosts.data);

        router.push(`/read/${newPost.id}`);
        router.refresh();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }}>
      <h2>Create</h2>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><input type="text" name="user_name" placeholder="user_name" /></p>
      <p><input type="password" name="user_password" placeholder="user_password" /></p>
      <p><textarea name="content" placeholder="content"></textarea></p>
      <p><input type="submit" value="create" /></p>
    </form>
);
  }
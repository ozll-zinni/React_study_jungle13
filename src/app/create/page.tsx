'use client';

import { useRouter } from "next/navigation";
import { useAtom } from 'jotai';
import { postAtom } from "../atom";

export default function Create() {
  const router = useRouter();
  const [posts, setPost] = useAtom(postAtom);

  return (
    <form onSubmit={(evt) => {
      evt.preventDefault();
      const target = evt.target as HTMLFormElement;

      const title = (target.elements.namedItem('title') as HTMLInputElement).value;
      const content = (target.elements.namedItem('content') as HTMLTextAreaElement).value;
      const user_name = (target.elements.namedItem('user_name') as HTMLInputElement).value;

      if (title.length < 10) {
        alert("제목은 10글자 이상이어야 합니다.");
        return;
      }

      const createdDate = new Date().toISOString();
      const newPost = {
        id: (posts ? posts.length + 1 : 1).toString(),
        title,
        content,
        user_name,
        created_at: createdDate,
      };

      setPost((prevPosts = []) => [...prevPosts, newPost]);

      router.push(`/read/${newPost.id}`);
      router.refresh();
    }}>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><input type="text" name="user_name" placeholder="user_name" /></p>
      <p><textarea name="content" placeholder="content"></textarea></p>
      <p>
        <button type="submit" className="submit-button">
          Write
        </button>
      </p>
    </form>
  );
}

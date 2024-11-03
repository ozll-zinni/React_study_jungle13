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
      const target = evt.target as HTMLFormElement;
    
      const title = (target.elements.namedItem('title') as HTMLInputElement).value;
      const content = (target.elements.namedItem('content') as HTMLTextAreaElement).value;
      const user_name = (target.elements.namedItem('user_name') as HTMLInputElement).value;
      const user_password = (target.elements.namedItem('user_password') as HTMLInputElement).value;
    

      if (title.length < 10) {
        alert("제목은 10글자 이상이어야 합니다.");
        return;
      }

      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, user_name, user_password }),
        });
        
        if (!resp.ok) throw new Error('게시글 생성에 실패했습니다.');
        
        const newPost = await resp.json();
        
        // 현재 날짜를 YYYY-MM-DD 형식으로 변환하여 사용
        const createdDate = new Date().toISOString().split("T")[0]; // "2024-10-31" 형식

        const formattedPost = {
          _id: newPost.id,
          title,
          content,
          user_name,
          created_at: createdDate, // 변환된 날짜 형식 사용
        };

        // 새 게시글을 로컬 상태에 추가
        setPost((prevPosts = []) => [...prevPosts, formattedPost]);

        // 생성된 게시글 페이지로 이동
        router.push(`/read/${newPost.id}`);
        router.refresh();
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }}>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><input type="text" name="user_name" placeholder="user_name" /></p>
      <p><input type="password" name="user_password" placeholder="user_password" /></p>
      <p><textarea name="content" placeholder="content"></textarea></p>
      <p>
        <button type="submit" className="w-full bg-[#6c7a89] text-white py-2 rounded hover:bg-[#5c6a79] transition-colors">
          Write
        </button>
      </p>
    </form>
  );
}

'use client';
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { postAtom } from "@/app/atom";

export default function Update() {
  const router = useRouter();
  const params = useParams();  
  const id = params.id;

  const [post, setPost] = useAtom(postAtom); 
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;

      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
          cache: 'no-cache',
        });
        
        if (!resp.ok) throw new Error("Failed to fetch post");

        const post = await resp.json();
        setTitle(post.title);
        setBody(post.body);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchPost();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-[#2d4356] mb-4">Update</h2>

      <form 
        onSubmit={async (evt) => {
          evt.preventDefault();

          if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
          }

          try {
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

            if (resp.status === 401) {
              alert("비밀번호가 틀렸습니다. 다시 시도해 주세요.");
              return;
            }

            if (!resp.ok) {
              alert(`업데이트에 실패했습니다. 오류 코드: ${resp.status}`);
              return;
            }

            const updatedPost = await resp.json();
            console.log("Updated post:", updatedPost);

            setPost((prevPosts) =>
              prevPosts.map((post) => (post._id === id ? updatedPost : post))
            );

            router.push(`/read/${id}`);
            router.refresh();
          } catch (error) {
            console.error("Failed to update post:", error);
            alert("업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.");
          }
        }}
      >
        <div className="mb-4">
          <input 
            type="text" 
            name="title" 
            placeholder="title" 
            onChange={e => setTitle(e.target.value)} 
            value={title}
            className="w-full text-lg font-semibold text-[#2d4356] bg-transparent border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
          />
        </div>
        
        <div className="mb-4">
          <textarea 
            name="body" 
            placeholder="body" 
            onChange={e => setBody(e.target.value)} 
            value={body}
            className="w-full text-gray-500 bg-transparent border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input 
            type="password" 
            placeholder="비밀번호 입력" 
            onChange={e => setPassword(e.target.value)} 
            value={password}
            className="w-full text-gray-500 bg-gray-100 py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-[#6c7a89] text-white py-2 px-4 rounded-md hover:bg-[#5c6a79] transition-colors"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

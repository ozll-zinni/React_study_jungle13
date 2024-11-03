// Control.tsx

'use client';

import { useRouter, useParams } from "next/navigation";
import { useAtom } from "jotai";
import { postAtom } from "./atom";

export default function Control() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [posts, setPost] = useAtom(postAtom);

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!resp.ok) throw new Error(`Failed to delete post with ID: ${id}`);
        setPost((prevPosts) => prevPosts.filter((post) => post.id !== id));
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("게시물 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };
}

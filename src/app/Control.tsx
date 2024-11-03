"use client";

import { useRouter, useParams } from "next/navigation";
import { useAtom } from "jotai";
import { postAtom } from "./atom";

export function Control() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [posts, setPost] = useAtom(postAtom);

  const handleDelete = async () => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        throw new Error(`Failed to delete post with ID: ${id}`);
      }

      // Immediately update local state to remove the post
      setPost((prevPosts) => prevPosts.filter((post) => post.id !== id));

      // Navigate to the posts list and trigger a refresh
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("게시물 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

}

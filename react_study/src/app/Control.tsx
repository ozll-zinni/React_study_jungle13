"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const router = useRouter();
  const params = useParams();
  const post_id = params.post_id;

  return (
    <ul>
      <li>
        <Link href="/create">create</Link>
      </li>
      {post_id ? (
        <>
          <li>
            <Link href={`/update/${post_id}`}>update</Link>
          </li>
          <li>
            <button
              onClick={async () => {
                const resp = await fetch(`http://api.ddubbu.com:8000/posts/${post_id}`, {
                  method: "DELETE",
                });

                if (resp.ok) {
                  router.push("/");
                  router.refresh();
                } else {
                  console.error("Failed to delete the post");
                }
              }}
            >
              delete
            </button>
          </li>
        </>
      ) : null}
    </ul>
  );
}

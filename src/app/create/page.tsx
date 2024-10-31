'use client';

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { postAtom } from "../atom";

export default function Create() {
  const router = useRouter();
  const [, setPost] = useAtom(postAtom);

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();
        const title = evt.target.title.value;
        const content = evt.target.content.value;
        const user_name = evt.target.user_name.value;
        const user_password = evt.target.user_password.value;

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content, user_name, user_password }),
        });

        const post = await resp.json();
        setPost(post);
        router.push(`/read/${post.id}`);
        router.refresh();
      }}
    >
      <h2>Create</h2>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><input type="name" name="user_name" placeholder="user_name" /></p>
      <p><input type="password" name="user_password" placeholder="user_password" /></p>
      <p><textarea name="content" placeholder="content"></textarea></p>
      <p><input type="submit" value="create" /></p>
    </form>
  );
}
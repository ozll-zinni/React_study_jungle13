'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Update(props: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    async function initializeId() {
      if (props.params instanceof Promise) {
        const resolvedParams = await props.params; // Promise가 맞다면 await으로 해제
        setId(resolvedParams.id);
      } else {
        setId(props.params.id); // Promise가 아니면 바로 접근
      }
    }
    initializeId();
  }, [props.params]);

  useEffect(() => {
    async function refresh() {
      if (id) {
        const resp = await fetch(`http://api.ddubbu.com:8000/posts`);
        const topic = await resp.json();
        setTitle(topic.title);
        setBody(topic.body);
      }
    }
    refresh();
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={async (evt) => {
        evt.preventDefault();
        const titleElement = (evt.target as HTMLFormElement).elements.namedItem('title') as HTMLInputElement;
        const bodyElement = (evt.target as HTMLFormElement).elements.namedItem('body') as HTMLTextAreaElement;
        const resp = await fetch(`http://api.ddubbu.com:8000/api-docs/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: titleElement.value, body: bodyElement.value }),
        });
        const topic = await resp.json();
        router.push(`/read/${topic.id}`);
        router.refresh();
      }}
    >
      <h2>Update</h2>
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}

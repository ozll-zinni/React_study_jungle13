interface Props {
  params: {
    post_id: string;
  };
}

export default async function Read(props: Props) {
  const post_id = props.params.post_id;
  
  const resp = await fetch(`http://api.ddubbu.com:8000/posts/${post_id}`, { cache: 'no-cache' });
  const post = await resp.json();

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
}

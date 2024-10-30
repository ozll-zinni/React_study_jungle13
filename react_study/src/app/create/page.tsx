'use client'
 
import { useRouter } from "next/navigation";
 
export default function Create(){
  const router = useRouter();
  return <form onSubmit={async evt=>{
    evt.preventDefault();

    const titleElement = (evt.target as HTMLFormElement).elements.namedItem("title") as HTMLInputElement;
    const bodyElement = (evt.target as HTMLFormElement).elements.namedItem("body") as HTMLTextAreaElement;
        
    const title = titleElement.value;
    const body = bodyElement.value;

    const resp = await fetch(`http://api.ddubbu.com:8000/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
    });
    const post = await resp.json();
    console.log("file: page.js:19 ~ Create ~ topic:", post)
    router.push(`/read/${post._id}`);
    router.refresh();
  }}>
    <h2>Create</h2>
    <p><input type="text" name="title" placeholder="title" /></p>
    <p><textarea name="body" placeholder="body"></textarea></p>
    <p><input type="submit" value="create" /></p>
  </form>
}
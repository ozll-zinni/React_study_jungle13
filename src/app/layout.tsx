import Link from 'next/link';
import './globals.css';
import { Control } from './Control';

export const metadata = {
  title: 'WEB tutorial',
  description: 'Generated by egoing',
};

export default async function RootLayout({ children }) {
  const resp = await fetch(`http://api.ddubbu.com:8000/posts/list`, { cache: 'no-cache' });
  const posts = await resp.json();
  console.log('API 응답:', posts);

  return (
    <html>
      <body>
        <h1><Link href="/">WEB</Link></h1>
        <ol>
          {Array.isArray(posts.data) ? (
            posts.data.map(post => (
              <li key={post._id}>
                <Link href={`/read/${post._id}`} as={`/read/${post._id}`}>
                    {post.title}
                </Link>              
            </li>
            ))
          ) : (
            <li>데이터를 불러오는 데 문제가 있습니다.</li>
          )}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
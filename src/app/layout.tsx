import Link from 'next/link';
import './globals.css';
import { Control } from './Control';
import { PostsProvider } from './postsProvider';

export const metadata = {
  title: 'Board',
  description: 'Yejin Board',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}posts/list`,
    { cache: 'no-store' }
  );
  const posts = await resp.json();

  return (
    <html>
      <body className="bg-[#f5e6ba] min-h-screen">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            {/* Board Title */}
            <h1 className="text-4xl font-bold text-[#2d4356]">
              <Link href="/">Board</Link>
            </h1>

            {/* Write Button */}
            <Link href="/create">
              <button className="bg-[#6c7a89] text-white py-2 px-4 rounded hover:bg-[#5c6a79] transition-colors">
                Write
              </button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <PostsProvider initialPosts={posts.data}>
              {children}
              <Control />
            </PostsProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

import Link from 'next/link';
import './globals.css';
import { PostsProvider } from './postsProvider';

export const metadata = {
  title: 'Board',
  description: 'Yejin Board',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialPosts = [
    {
      id: '1',
      title: 'Sample Post',
      content: 'This is a sample post.',
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <html>
      <body className="main-body">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1 className="title">
              <Link href="/" className="link-no-underline">Board</Link>
            </h1>
          </div>

          {/* Main Content */}
          <div className="content">
            <PostsProvider initialPosts={initialPosts}>
              {children}
            </PostsProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

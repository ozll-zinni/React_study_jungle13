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
  // JSON Server를 사용하지 않기 위해 API 호출을 제거하고 PostsProvider에서 초기 상태를 설정합니다.
  const initialPosts = [
    {
      id: '1',
      title: 'Sample Post',
      content: 'This is a sample post.',
      created_at: new Date().toISOString(),
    },
    // 초기 데이터에 필요한 다른 게시글들을 추가
  ];

  return (
    <html>
      <body className="main-body">
        <div className="container">
          {/* Header */}
          <div className="header">
            <h1 className="title">
              <Link href="/">Board</Link>
            </h1>
            <Link href="/create">
              <button className="write-button">
                Write
              </button>
            </Link>
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

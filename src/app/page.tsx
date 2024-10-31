'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { postAtom } from './atom';

export default function Home() {
  const [posts] = useAtom(postAtom);
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#2d4356]">Board list</h2>
      
      <p className="text-sm text-gray-600 mb-4">Total post : {posts.length}</p>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left w-20">No</th>
            <th className="py-2 text-left">Title</th>
            <th className="py-2 text-right w-32">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any, index: number) => (
            <tr key={`${post._id}-${index}`} className="border-b hover:bg-gray-50">
              <td className="py-3">{posts.length - index}</td>
              <td className="py-3">
                <Link href={`/read/${post._id}`} className="hover:underline">
                  {post.title}
                </Link>
              </td>
              <td className="py-3 text-right">
                {new Date(post.created_at).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Write Button */}
      <div className="mt-6">
        <Link href="/create" className="block w-full">
          <button className="w-full bg-[#6c7a89] text-white py-2 rounded hover:bg-[#5c6a79] transition-colors">
            Write
          </button>
        </Link>
      </div>
    </div>
  );
}

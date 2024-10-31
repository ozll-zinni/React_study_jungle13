import { atom } from 'jotai';

// post 데이터를 위한 atom
interface Post {
  _id: string;
  title: string;
  content?: string;
  user_name?: string;
  created_at?: string;
}
export const postAtom = atom<Post[]>([]);
import { atom } from 'jotai';

// post 데이터를 위한 atom
export interface Post {
  id: string;
  title: string;
  content?: string;
  user_name?: string;
  created_at?: string;
  status: 'Not Started' | 'In Progress' | 'Done';
}
export const postAtom = atom<Post[]>([]);
import { atom } from 'jotai';

// post 데이터를 위한 atom
export const postAtom = atom<{ id?: string; title: string; user_name: string; created_at?: string; content?: string; } | null>(null);

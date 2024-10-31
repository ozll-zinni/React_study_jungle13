'use client';

import { ReactNode } from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { postAtom } from './atom';

interface PostsProviderProps {
    initialPosts: any[];
    children: ReactNode;
}
export function PostsProvider({ initialPosts, children }: PostsProviderProps) {
  useHydrateAtoms([[postAtom, initialPosts]]);
  return <>{children}</>;
}
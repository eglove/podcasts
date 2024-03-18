import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className={twMerge(inter.className, 'max-w-7xl m-4')}>
      {children}
    </main>
  );
}

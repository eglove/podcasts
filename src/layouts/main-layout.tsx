import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className={twMerge(inter.className, 'w-full max-w-7xl p-4 mx-auto')}>
      {children}
    </main>
  );
}

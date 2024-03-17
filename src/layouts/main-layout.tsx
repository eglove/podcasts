import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export function MainLayout({ children }: PropsWithChildren) {
  return <main className={inter.className}>{children}</main>;
}

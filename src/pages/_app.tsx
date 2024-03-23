import '../styles/globals.css';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ display: 'swap', subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
      <NextUIProvider navigate={router.push}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

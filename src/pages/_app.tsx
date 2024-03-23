import '../styles/globals.css';

import { NextUIProvider } from '@nextui-org/react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary
        queryClient={queryClient}
        state={pageProps.dehydratedState}
      >
        {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
        <NextUIProvider navigate={router.push}>
          <Component {...pageProps} />
        </NextUIProvider>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@material-tailwind/react';

import { TrackProvider } from 'context';
import { initAuth } from 'utils';
import { theme } from 'theme';

import type { AppProps } from 'next/app';

import 'styles/globals.css';

initAuth();

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider value={theme}>
          <TrackProvider>
            <Component {...pageProps} />
          </TrackProvider>
        </ThemeProvider>
      </Hydrate>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
};

export default App;

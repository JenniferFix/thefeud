import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const TanStackRouterDevtools =
  process.env.VITE_VERCEL_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const Devtools = () => {
  return (
    <React.Fragment>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <React.Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </React.Suspense>
    </React.Fragment>
  );
};

export default Devtools;

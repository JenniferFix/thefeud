import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const TanStackRouterDevtools =
  import.meta.env.DEV === true
    ? React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )
    : () => null;

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

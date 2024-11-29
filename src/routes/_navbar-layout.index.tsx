import * as React from 'react';
import Home from '@/components/home/Home';
import { createFileRoute } from '@tanstack/react-router';
import { getUserGamesQueryOptions } from '@/hooks/usegamequeries';

export const Route = createFileRoute('/_navbar-layout/')({
  // loader: async ({ context }) => {
  //   // console.log(context?.auth?.user?.id);
  //   return await context.queryClient.ensureQueryData(
  //     getUserGamesQueryOptions(context.auth?.user?.id || ''),
  //   );
  // },
  component: HomeComponent,
});

function HomeComponent() {
  return <Home />;
}

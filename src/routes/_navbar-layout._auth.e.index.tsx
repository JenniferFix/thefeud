import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar-layout/_auth/e/')({
  beforeLoad: () => redirect({ to: '/e/games' }),
  // loader: () => redirect({ to: '/e/games' }),
});

import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar-layout/_auth/c')({
  component: () => <Outlet />,
});

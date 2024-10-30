import { createFileRoute, Outlet } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { useSupabaseAuth } from '@/supabaseauth';

export const Route = createFileRoute('/_navbar-layout/_auth')({
  beforeLoad: async ({ context, location }) => {
    if (!(await context.auth?.checkAuthenticated())) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <Outlet />,
});

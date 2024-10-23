import { createFileRoute } from '@tanstack/react-router';
import LoginComponent from '@/components/login/Login';
import { z } from 'zod';
import { redirect, useRouter } from '@tanstack/react-router';

const fallback = '/';

export const Route = createFileRoute('/_navbar-layout/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: Comp,
});

function Comp() {
  const search = Route.useSearch();
  return <LoginComponent redirect={search.redirect} />;
}

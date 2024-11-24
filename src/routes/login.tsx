import { createFileRoute } from '@tanstack/react-router';
import LoginForm from '@/components/login/LoginForm';

type LoginSearchParams = {
  redirect: string;
};

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearchParams => {
    return {
      redirect: (search?.redirect as string) || '/',
    };
  },
  component: () => <LoginPage />,
});

const LoginPage = () => {
  const { redirect } = Route.useSearch();
  return (
    <div>
      <LoginForm redirect={redirect} />
    </div>
  );
};

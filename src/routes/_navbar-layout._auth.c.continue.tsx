import { createFileRoute } from '@tanstack/react-router';
import { getUserInstancesQueryOptions } from '@/hooks/useinstancequeries';
import ContinueGamePage from '@/components/gamecontrol/ContinueGamePage';

export const Route = createFileRoute('/_navbar-layout/_auth/c/continue')({
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(
      getUserInstancesQueryOptions(context.auth?.user?.id || ''),
    );
  },
  component: () => <Page />,
});

const Page = () => {
  return <ContinueGamePage />;
};

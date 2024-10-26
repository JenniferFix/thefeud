import { createFileRoute, Outlet } from '@tanstack/react-router';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import AllQuestionsList from '@/components/editor/AllQuestionsList';
import { useRouterState } from '@tanstack/react-router';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const Route = createFileRoute('/_navbar-layout/_auth/e/questions')({
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(questionsQueryOptions(auth?.user?.id!)),
  component: () => <QuestionsLayout />,
});

function QuestionsLayout() {
  const location = useRouterState({ select: (state) => state.location });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isQuestionRoute = location.pathname.includes('/questions/');

  if (isMobile) {
    if (isQuestionRoute) {
      return <Outlet />;
    } else {
      return <AllQuestionsList />;
    }
  } else {
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <AllQuestionsList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
}

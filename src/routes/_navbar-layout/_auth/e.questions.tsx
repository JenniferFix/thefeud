import { createFileRoute, Outlet } from '@tanstack/react-router';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useRouterState } from '@tanstack/react-router';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Questions from '@/components/editor/Questions';

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
      return <Questions />;
    }
  } else {
    return (
      <ResizablePanelGroup direction="horizontal" autoSaveId="questionspanel">
        <ResizablePanel defaultSize={25}>
          <Questions />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
}

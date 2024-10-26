import { createFileRoute, Outlet } from '@tanstack/react-router';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import AllQuestionsList from '@/components/editor/AllQuestionsList';

export const Route = createFileRoute('/_navbar-layout/_auth/e/questions')({
  loader: ({ context: { queryClient, auth } }) =>
    queryClient.ensureQueryData(questionsQueryOptions(auth?.user?.id!)),
  component: () => <QuestionsLayout />,
});

function QuestionsLayout() {
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

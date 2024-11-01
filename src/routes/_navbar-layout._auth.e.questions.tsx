import * as React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { questionsQueryOptions } from '@/hooks/usequestionqueries';
import Questions from '@/components/editor/Questions';
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouterState } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar-layout/_auth/e/questions')({
  loader: async ({ context: { queryClient, auth } }) => {
    // TODO: Fix the problem with not having the user.id on the first render
    // (hence no data query possible here)
    // return await queryClient.ensureQueryData(
    //   questionsQueryOptions(auth?.user?.id!),
    // );
  },
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
      <ResizablePanelGroup
        direction="horizontal"
        autoSaveId="questionspanel"
        tagName="main"
      >
        <ResizablePanel tagName="section" defaultSize={25}>
          <Questions />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel tagName="section" defaultSize={75}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
}

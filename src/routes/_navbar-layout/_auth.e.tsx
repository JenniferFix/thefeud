import React from 'react';
import { createFileRoute, Outlet, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar-layout/_auth/e')({
  component: () => <EditorLayout />,
});

function EditorLayout() {
  return (
    <React.Fragment>
      <div className="flex border-b">
        <Link
          to="/e/games"
          className="hover:underline border-e p-3 hover:bg-accent/50"
          activeProps={{ className: 'bg-accent/75' }}
        >
          Game Editor
        </Link>
        <Link
          to="/e/questions"
          className="hover:underline border-e p-3 hover:bg-accent/50"
          activeProps={{ className: 'bg-accent/75' }}
        >
          Question Editor
        </Link>
      </div>
      <Outlet />
    </React.Fragment>
  );
}

import React from 'react';
import { createFileRoute, Outlet, Link } from '@tanstack/react-router';
import NavLink from '@/components/NavLink';

export const Route = createFileRoute('/_navbar-layout/_auth/e')({
  component: () => <EditorLayout />,
});

function EditorLayout() {
  return (
    <React.Fragment>
      <div className="flex border-b">
        <NavLink to="/e/games">Game Editor</NavLink>
        <NavLink to="/e/questions">Question Editor</NavLink>
      </div>
      <Outlet />
    </React.Fragment>
  );
}

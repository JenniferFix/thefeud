import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import NavLink from '@/components/NavLink';

export const Route = createFileRoute('/_navbar-layout/_auth/c')({
  component: () => <ControlLayout />,
});

const ControlLayout = () => {
  return (
    <React.Fragment>
      <div className="flex border-b">
        <NavLink to="/c/new">Start New Game</NavLink>
        <NavLink to="/c/continue">Continue Game</NavLink>
      </div>
      <Outlet />
    </React.Fragment>
  );
};

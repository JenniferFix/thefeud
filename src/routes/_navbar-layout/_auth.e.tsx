import * as React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import Editor from '@/components/editor/Editor';
import { useSupabaseAuth } from '@/supabaseauth';

export const Route = createFileRoute('/_navbar-layout/_auth/e')({
  component: () => <EditorLayout />,
});

const EditorLayout = () => {
  return (
    <div>
      <div>Stuffs</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

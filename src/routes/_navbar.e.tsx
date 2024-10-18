import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import Editor from '@/components/editor/Editor';
import { useAuthStore } from '@/store';

export const Route = createFileRoute('/_navbar/e')({
  component: EditComponent,
});

function EditComponent() {
  const session = useAuthStore((state) => state.session);
  // const user = useAuthStore((state) => state.user);

  if (session) return <Editor />;
  else redirect({ to: '/login' });
}

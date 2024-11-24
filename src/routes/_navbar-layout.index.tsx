import * as React from 'react';
import Home from '@/components/home/Home';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar-layout/')({
  component: HomeComponent,
});

function HomeComponent() {
  return <Home />;
}

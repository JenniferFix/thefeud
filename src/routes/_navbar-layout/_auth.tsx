import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar-layout/_auth')({
  beforeLoad: ({ context, location }) => {
    console.log(context);
  },
  component: () => <div>Hello /_navbar-layout/_auth!</div>,
});

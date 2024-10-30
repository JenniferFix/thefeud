import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_navbar-layout/_auth/active')({
  component: () => <div>Hello /_navbar-layout/_auth/active!</div>,
})

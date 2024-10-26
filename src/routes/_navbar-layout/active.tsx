import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_navbar-layout/active')({
  component: () => <div>Hello /_navbar-layout/active!</div>,
})

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_navbar-layout/_auth/e/questions/')({
  component: () => (
    <div>Select a question or type a new one in the form and hit add</div>
  ),
})

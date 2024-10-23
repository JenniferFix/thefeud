import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_navbar-layout/_auth/e/')({
  component: EditorLayout,
})

function EditorLayout() {
  return <div>Select a game or lets create a new one</div>
}

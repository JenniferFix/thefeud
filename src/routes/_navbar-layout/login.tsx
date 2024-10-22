import { createFileRoute } from '@tanstack/react-router'
import LoginComponent from '@/components/login/Login'

export const Route = createFileRoute('/_navbar-layout/login')({
  component: LoginComponent,
})

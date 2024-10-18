import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Home from '@/components/home/Home'

export const Route = createFileRoute('/_navbar/')({
  component: HomeComponent,
})

function HomeComponent() {
  return <Home />
}

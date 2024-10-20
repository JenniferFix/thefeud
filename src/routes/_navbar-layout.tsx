import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import Layout from '@/components/Layout'

export const Route = createFileRoute('/_navbar-layout')({
  component: NavigationLayout,
})

function NavigationLayout() {
  return <Layout />
}

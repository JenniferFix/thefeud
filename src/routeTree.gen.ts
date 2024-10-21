/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as NavbarLayoutImport } from './routes/_navbar-layout'
import { Route as NavbarLayoutIndexImport } from './routes/_navbar-layout/index'
import { Route as GGameInstanceIdImport } from './routes/g.$gameInstanceId'
import { Route as CGameInstanceIdImport } from './routes/c.$gameInstanceId'
import { Route as NavbarLayoutEImport } from './routes/_navbar-layout/e'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const NavbarLayoutRoute = NavbarLayoutImport.update({
  id: '/_navbar-layout',
  getParentRoute: () => rootRoute,
} as any)

const NavbarLayoutIndexRoute = NavbarLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => NavbarLayoutRoute,
} as any)

const GGameInstanceIdRoute = GGameInstanceIdImport.update({
  path: '/g/$gameInstanceId',
  getParentRoute: () => rootRoute,
} as any)

const CGameInstanceIdRoute = CGameInstanceIdImport.update({
  path: '/c/$gameInstanceId',
  getParentRoute: () => rootRoute,
} as any)

const NavbarLayoutERoute = NavbarLayoutEImport.update({
  path: '/e',
  getParentRoute: () => NavbarLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_navbar-layout': {
      id: '/_navbar-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof NavbarLayoutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/_navbar-layout/e': {
      id: '/_navbar-layout/e'
      path: '/e'
      fullPath: '/e'
      preLoaderRoute: typeof NavbarLayoutEImport
      parentRoute: typeof NavbarLayoutImport
    }
    '/c/$gameInstanceId': {
      id: '/c/$gameInstanceId'
      path: '/c/$gameInstanceId'
      fullPath: '/c/$gameInstanceId'
      preLoaderRoute: typeof CGameInstanceIdImport
      parentRoute: typeof rootRoute
    }
    '/g/$gameInstanceId': {
      id: '/g/$gameInstanceId'
      path: '/g/$gameInstanceId'
      fullPath: '/g/$gameInstanceId'
      preLoaderRoute: typeof GGameInstanceIdImport
      parentRoute: typeof rootRoute
    }
    '/_navbar-layout/': {
      id: '/_navbar-layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof NavbarLayoutIndexImport
      parentRoute: typeof NavbarLayoutImport
    }
  }
}

// Create and export the route tree

interface NavbarLayoutRouteChildren {
  NavbarLayoutERoute: typeof NavbarLayoutERoute
  NavbarLayoutIndexRoute: typeof NavbarLayoutIndexRoute
}

const NavbarLayoutRouteChildren: NavbarLayoutRouteChildren = {
  NavbarLayoutERoute: NavbarLayoutERoute,
  NavbarLayoutIndexRoute: NavbarLayoutIndexRoute,
}

const NavbarLayoutRouteWithChildren = NavbarLayoutRoute._addFileChildren(
  NavbarLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof NavbarLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/about': typeof AboutLazyRoute
  '/e': typeof NavbarLayoutERoute
  '/c/$gameInstanceId': typeof CGameInstanceIdRoute
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/': typeof NavbarLayoutIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/about': typeof AboutLazyRoute
  '/e': typeof NavbarLayoutERoute
  '/c/$gameInstanceId': typeof CGameInstanceIdRoute
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/': typeof NavbarLayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_navbar-layout': typeof NavbarLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/about': typeof AboutLazyRoute
  '/_navbar-layout/e': typeof NavbarLayoutERoute
  '/c/$gameInstanceId': typeof CGameInstanceIdRoute
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/_navbar-layout/': typeof NavbarLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/about'
    | '/e'
    | '/c/$gameInstanceId'
    | '/g/$gameInstanceId'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/about'
    | '/e'
    | '/c/$gameInstanceId'
    | '/g/$gameInstanceId'
    | '/'
  id:
    | '__root__'
    | '/_navbar-layout'
    | '/login'
    | '/about'
    | '/_navbar-layout/e'
    | '/c/$gameInstanceId'
    | '/g/$gameInstanceId'
    | '/_navbar-layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  NavbarLayoutRoute: typeof NavbarLayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
  AboutLazyRoute: typeof AboutLazyRoute
  CGameInstanceIdRoute: typeof CGameInstanceIdRoute
  GGameInstanceIdRoute: typeof GGameInstanceIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  NavbarLayoutRoute: NavbarLayoutRouteWithChildren,
  LoginRoute: LoginRoute,
  AboutLazyRoute: AboutLazyRoute,
  CGameInstanceIdRoute: CGameInstanceIdRoute,
  GGameInstanceIdRoute: GGameInstanceIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_navbar-layout",
        "/login",
        "/about",
        "/c/$gameInstanceId",
        "/g/$gameInstanceId"
      ]
    },
    "/_navbar-layout": {
      "filePath": "_navbar-layout.tsx",
      "children": [
        "/_navbar-layout/e",
        "/_navbar-layout/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/_navbar-layout/e": {
      "filePath": "_navbar-layout/e.tsx",
      "parent": "/_navbar-layout"
    },
    "/c/$gameInstanceId": {
      "filePath": "c.$gameInstanceId.tsx"
    },
    "/g/$gameInstanceId": {
      "filePath": "g.$gameInstanceId.tsx"
    },
    "/_navbar-layout/": {
      "filePath": "_navbar-layout/index.tsx",
      "parent": "/_navbar-layout"
    }
  }
}
ROUTE_MANIFEST_END */
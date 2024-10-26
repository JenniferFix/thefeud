/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as NavbarLayoutImport } from './routes/_navbar-layout'
import { Route as NavbarLayoutIndexImport } from './routes/_navbar-layout/index'
import { Route as GGameInstanceIdImport } from './routes/g.$gameInstanceId'
import { Route as CGameInstanceIdImport } from './routes/c.$gameInstanceId'
import { Route as NavbarLayoutLoginImport } from './routes/_navbar-layout/login'
import { Route as NavbarLayoutActiveImport } from './routes/_navbar-layout/active'
import { Route as NavbarLayoutAuthImport } from './routes/_navbar-layout/_auth'
import { Route as NavbarLayoutAuthEImport } from './routes/_navbar-layout/_auth.e'
import { Route as NavbarLayoutAuthEIndexImport } from './routes/_navbar-layout/_auth.e.index'
import { Route as NavbarLayoutAuthEQuestionsImport } from './routes/_navbar-layout/_auth.e.questions'
import { Route as NavbarLayoutAuthEGamesImport } from './routes/_navbar-layout/_auth.e.games'
import { Route as NavbarLayoutAuthEGamesIndexImport } from './routes/_navbar-layout/_auth.e.games.index'
import { Route as NavbarLayoutAuthEGamesGameIdImport } from './routes/_navbar-layout/_auth.e.games.$gameId'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

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

const NavbarLayoutLoginRoute = NavbarLayoutLoginImport.update({
  path: '/login',
  getParentRoute: () => NavbarLayoutRoute,
} as any)

const NavbarLayoutActiveRoute = NavbarLayoutActiveImport.update({
  path: '/active',
  getParentRoute: () => NavbarLayoutRoute,
} as any)

const NavbarLayoutAuthRoute = NavbarLayoutAuthImport.update({
  id: '/_auth',
  getParentRoute: () => NavbarLayoutRoute,
} as any)

const NavbarLayoutAuthERoute = NavbarLayoutAuthEImport.update({
  path: '/e',
  getParentRoute: () => NavbarLayoutAuthRoute,
} as any)

const NavbarLayoutAuthEIndexRoute = NavbarLayoutAuthEIndexImport.update({
  path: '/',
  getParentRoute: () => NavbarLayoutAuthERoute,
} as any)

const NavbarLayoutAuthEQuestionsRoute = NavbarLayoutAuthEQuestionsImport.update(
  {
    path: '/questions',
    getParentRoute: () => NavbarLayoutAuthERoute,
  } as any,
)

const NavbarLayoutAuthEGamesRoute = NavbarLayoutAuthEGamesImport.update({
  path: '/games',
  getParentRoute: () => NavbarLayoutAuthERoute,
} as any)

const NavbarLayoutAuthEGamesIndexRoute =
  NavbarLayoutAuthEGamesIndexImport.update({
    path: '/',
    getParentRoute: () => NavbarLayoutAuthEGamesRoute,
  } as any)

const NavbarLayoutAuthEGamesGameIdRoute =
  NavbarLayoutAuthEGamesGameIdImport.update({
    path: '/$gameId',
    getParentRoute: () => NavbarLayoutAuthEGamesRoute,
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
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/_navbar-layout/_auth': {
      id: '/_navbar-layout/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof NavbarLayoutAuthImport
      parentRoute: typeof NavbarLayoutImport
    }
    '/_navbar-layout/active': {
      id: '/_navbar-layout/active'
      path: '/active'
      fullPath: '/active'
      preLoaderRoute: typeof NavbarLayoutActiveImport
      parentRoute: typeof NavbarLayoutImport
    }
    '/_navbar-layout/login': {
      id: '/_navbar-layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof NavbarLayoutLoginImport
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
    '/_navbar-layout/_auth/e': {
      id: '/_navbar-layout/_auth/e'
      path: '/e'
      fullPath: '/e'
      preLoaderRoute: typeof NavbarLayoutAuthEImport
      parentRoute: typeof NavbarLayoutAuthImport
    }
    '/_navbar-layout/_auth/e/games': {
      id: '/_navbar-layout/_auth/e/games'
      path: '/games'
      fullPath: '/e/games'
      preLoaderRoute: typeof NavbarLayoutAuthEGamesImport
      parentRoute: typeof NavbarLayoutAuthEImport
    }
    '/_navbar-layout/_auth/e/questions': {
      id: '/_navbar-layout/_auth/e/questions'
      path: '/questions'
      fullPath: '/e/questions'
      preLoaderRoute: typeof NavbarLayoutAuthEQuestionsImport
      parentRoute: typeof NavbarLayoutAuthEImport
    }
    '/_navbar-layout/_auth/e/': {
      id: '/_navbar-layout/_auth/e/'
      path: '/'
      fullPath: '/e/'
      preLoaderRoute: typeof NavbarLayoutAuthEIndexImport
      parentRoute: typeof NavbarLayoutAuthEImport
    }
    '/_navbar-layout/_auth/e/games/$gameId': {
      id: '/_navbar-layout/_auth/e/games/$gameId'
      path: '/$gameId'
      fullPath: '/e/games/$gameId'
      preLoaderRoute: typeof NavbarLayoutAuthEGamesGameIdImport
      parentRoute: typeof NavbarLayoutAuthEGamesImport
    }
    '/_navbar-layout/_auth/e/games/': {
      id: '/_navbar-layout/_auth/e/games/'
      path: '/'
      fullPath: '/e/games/'
      preLoaderRoute: typeof NavbarLayoutAuthEGamesIndexImport
      parentRoute: typeof NavbarLayoutAuthEGamesImport
    }
  }
}

// Create and export the route tree

interface NavbarLayoutAuthEGamesRouteChildren {
  NavbarLayoutAuthEGamesGameIdRoute: typeof NavbarLayoutAuthEGamesGameIdRoute
  NavbarLayoutAuthEGamesIndexRoute: typeof NavbarLayoutAuthEGamesIndexRoute
}

const NavbarLayoutAuthEGamesRouteChildren: NavbarLayoutAuthEGamesRouteChildren =
  {
    NavbarLayoutAuthEGamesGameIdRoute: NavbarLayoutAuthEGamesGameIdRoute,
    NavbarLayoutAuthEGamesIndexRoute: NavbarLayoutAuthEGamesIndexRoute,
  }

const NavbarLayoutAuthEGamesRouteWithChildren =
  NavbarLayoutAuthEGamesRoute._addFileChildren(
    NavbarLayoutAuthEGamesRouteChildren,
  )

interface NavbarLayoutAuthERouteChildren {
  NavbarLayoutAuthEGamesRoute: typeof NavbarLayoutAuthEGamesRouteWithChildren
  NavbarLayoutAuthEQuestionsRoute: typeof NavbarLayoutAuthEQuestionsRoute
  NavbarLayoutAuthEIndexRoute: typeof NavbarLayoutAuthEIndexRoute
}

const NavbarLayoutAuthERouteChildren: NavbarLayoutAuthERouteChildren = {
  NavbarLayoutAuthEGamesRoute: NavbarLayoutAuthEGamesRouteWithChildren,
  NavbarLayoutAuthEQuestionsRoute: NavbarLayoutAuthEQuestionsRoute,
  NavbarLayoutAuthEIndexRoute: NavbarLayoutAuthEIndexRoute,
}

const NavbarLayoutAuthERouteWithChildren =
  NavbarLayoutAuthERoute._addFileChildren(NavbarLayoutAuthERouteChildren)

interface NavbarLayoutAuthRouteChildren {
  NavbarLayoutAuthERoute: typeof NavbarLayoutAuthERouteWithChildren
}

const NavbarLayoutAuthRouteChildren: NavbarLayoutAuthRouteChildren = {
  NavbarLayoutAuthERoute: NavbarLayoutAuthERouteWithChildren,
}

const NavbarLayoutAuthRouteWithChildren =
  NavbarLayoutAuthRoute._addFileChildren(NavbarLayoutAuthRouteChildren)

interface NavbarLayoutRouteChildren {
  NavbarLayoutAuthRoute: typeof NavbarLayoutAuthRouteWithChildren
  NavbarLayoutActiveRoute: typeof NavbarLayoutActiveRoute
  NavbarLayoutLoginRoute: typeof NavbarLayoutLoginRoute
  NavbarLayoutIndexRoute: typeof NavbarLayoutIndexRoute
}

const NavbarLayoutRouteChildren: NavbarLayoutRouteChildren = {
  NavbarLayoutAuthRoute: NavbarLayoutAuthRouteWithChildren,
  NavbarLayoutActiveRoute: NavbarLayoutActiveRoute,
  NavbarLayoutLoginRoute: NavbarLayoutLoginRoute,
  NavbarLayoutIndexRoute: NavbarLayoutIndexRoute,
}

const NavbarLayoutRouteWithChildren = NavbarLayoutRoute._addFileChildren(
  NavbarLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof NavbarLayoutAuthRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/active': typeof NavbarLayoutActiveRoute
  '/login': typeof NavbarLayoutLoginRoute
  '/c/$gameInstanceId': typeof CGameInstanceIdRoute
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/': typeof NavbarLayoutIndexRoute
  '/e': typeof NavbarLayoutAuthERouteWithChildren
  '/e/games': typeof NavbarLayoutAuthEGamesRouteWithChildren
  '/e/questions': typeof NavbarLayoutAuthEQuestionsRoute
  '/e/': typeof NavbarLayoutAuthEIndexRoute
  '/e/games/$gameId': typeof NavbarLayoutAuthEGamesGameIdRoute
  '/e/games/': typeof NavbarLayoutAuthEGamesIndexRoute
}

export interface FileRoutesByTo {
  '/about': typeof AboutLazyRoute
  '': typeof NavbarLayoutAuthRouteWithChildren
  '/active': typeof NavbarLayoutActiveRoute
  '/login': typeof NavbarLayoutLoginRoute
  '/c/$gameInstanceId': typeof CGameInstanceIdRoute
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/': typeof NavbarLayoutIndexRoute
  '/e/questions': typeof NavbarLayoutAuthEQuestionsRoute
  '/e': typeof NavbarLayoutAuthEIndexRoute
  '/e/games/$gameId': typeof NavbarLayoutAuthEGamesGameIdRoute
  '/e/games': typeof NavbarLayoutAuthEGamesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_navbar-layout': typeof NavbarLayoutRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/_navbar-layout/_auth': typeof NavbarLayoutAuthRouteWithChildren
  '/_navbar-layout/active': typeof NavbarLayoutActiveRoute
  '/_navbar-layout/login': typeof NavbarLayoutLoginRoute
  '/c/$gameInstanceId': typeof CGameInstanceIdRoute
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/_navbar-layout/': typeof NavbarLayoutIndexRoute
  '/_navbar-layout/_auth/e': typeof NavbarLayoutAuthERouteWithChildren
  '/_navbar-layout/_auth/e/games': typeof NavbarLayoutAuthEGamesRouteWithChildren
  '/_navbar-layout/_auth/e/questions': typeof NavbarLayoutAuthEQuestionsRoute
  '/_navbar-layout/_auth/e/': typeof NavbarLayoutAuthEIndexRoute
  '/_navbar-layout/_auth/e/games/$gameId': typeof NavbarLayoutAuthEGamesGameIdRoute
  '/_navbar-layout/_auth/e/games/': typeof NavbarLayoutAuthEGamesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/about'
    | '/active'
    | '/login'
    | '/c/$gameInstanceId'
    | '/g/$gameInstanceId'
    | '/'
    | '/e'
    | '/e/games'
    | '/e/questions'
    | '/e/'
    | '/e/games/$gameId'
    | '/e/games/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/about'
    | ''
    | '/active'
    | '/login'
    | '/c/$gameInstanceId'
    | '/g/$gameInstanceId'
    | '/'
    | '/e/questions'
    | '/e'
    | '/e/games/$gameId'
    | '/e/games'
  id:
    | '__root__'
    | '/_navbar-layout'
    | '/about'
    | '/_navbar-layout/_auth'
    | '/_navbar-layout/active'
    | '/_navbar-layout/login'
    | '/c/$gameInstanceId'
    | '/g/$gameInstanceId'
    | '/_navbar-layout/'
    | '/_navbar-layout/_auth/e'
    | '/_navbar-layout/_auth/e/games'
    | '/_navbar-layout/_auth/e/questions'
    | '/_navbar-layout/_auth/e/'
    | '/_navbar-layout/_auth/e/games/$gameId'
    | '/_navbar-layout/_auth/e/games/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  NavbarLayoutRoute: typeof NavbarLayoutRouteWithChildren
  AboutLazyRoute: typeof AboutLazyRoute
  CGameInstanceIdRoute: typeof CGameInstanceIdRoute
  GGameInstanceIdRoute: typeof GGameInstanceIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  NavbarLayoutRoute: NavbarLayoutRouteWithChildren,
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
        "/about",
        "/c/$gameInstanceId",
        "/g/$gameInstanceId"
      ]
    },
    "/_navbar-layout": {
      "filePath": "_navbar-layout.tsx",
      "children": [
        "/_navbar-layout/_auth",
        "/_navbar-layout/active",
        "/_navbar-layout/login",
        "/_navbar-layout/"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/_navbar-layout/_auth": {
      "filePath": "_navbar-layout/_auth.tsx",
      "parent": "/_navbar-layout",
      "children": [
        "/_navbar-layout/_auth/e"
      ]
    },
    "/_navbar-layout/active": {
      "filePath": "_navbar-layout/active.tsx",
      "parent": "/_navbar-layout"
    },
    "/_navbar-layout/login": {
      "filePath": "_navbar-layout/login.tsx",
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
    },
    "/_navbar-layout/_auth/e": {
      "filePath": "_navbar-layout/_auth.e.tsx",
      "parent": "/_navbar-layout/_auth",
      "children": [
        "/_navbar-layout/_auth/e/games",
        "/_navbar-layout/_auth/e/questions",
        "/_navbar-layout/_auth/e/"
      ]
    },
    "/_navbar-layout/_auth/e/games": {
      "filePath": "_navbar-layout/_auth.e.games.tsx",
      "parent": "/_navbar-layout/_auth/e",
      "children": [
        "/_navbar-layout/_auth/e/games/$gameId",
        "/_navbar-layout/_auth/e/games/"
      ]
    },
    "/_navbar-layout/_auth/e/questions": {
      "filePath": "_navbar-layout/_auth.e.questions.tsx",
      "parent": "/_navbar-layout/_auth/e"
    },
    "/_navbar-layout/_auth/e/": {
      "filePath": "_navbar-layout/_auth.e.index.tsx",
      "parent": "/_navbar-layout/_auth/e"
    },
    "/_navbar-layout/_auth/e/games/$gameId": {
      "filePath": "_navbar-layout/_auth.e.games.$gameId.tsx",
      "parent": "/_navbar-layout/_auth/e/games"
    },
    "/_navbar-layout/_auth/e/games/": {
      "filePath": "_navbar-layout/_auth.e.games.index.tsx",
      "parent": "/_navbar-layout/_auth/e/games"
    }
  }
}
ROUTE_MANIFEST_END */

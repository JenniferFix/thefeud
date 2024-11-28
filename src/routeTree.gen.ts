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
import { Route as NavbarLayoutIndexImport } from './routes/_navbar-layout.index'
import { Route as GGameInstanceIdImport } from './routes/g.$gameInstanceId'
import { Route as NavbarLayoutAuthImport } from './routes/_navbar-layout._auth'
import { Route as NavbarLayoutAuthEImport } from './routes/_navbar-layout._auth.e'
import { Route as NavbarLayoutAuthCImport } from './routes/_navbar-layout._auth.c'
import { Route as NavbarLayoutAuthActiveImport } from './routes/_navbar-layout._auth.active'
import { Route as AuthCGameInstanceIdImport } from './routes/_auth.c.$gameInstanceId'
import { Route as NavbarLayoutAuthEIndexImport } from './routes/_navbar-layout._auth.e.index'
import { Route as NavbarLayoutAuthCIndexImport } from './routes/_navbar-layout._auth.c.index'
import { Route as AuthCGameInstanceIdIndexImport } from './routes/_auth.c.$gameInstanceId.index'
import { Route as NavbarLayoutAuthEQuestionsImport } from './routes/_navbar-layout._auth.e.questions'
import { Route as NavbarLayoutAuthEGamesImport } from './routes/_navbar-layout._auth.e.games'
import { Route as NavbarLayoutAuthCNewImport } from './routes/_navbar-layout._auth.c.new'
import { Route as NavbarLayoutAuthCContinueImport } from './routes/_navbar-layout._auth.c.continue'
import { Route as AuthCGameInstanceIdQuestionIdImport } from './routes/_auth.c.$gameInstanceId.$questionId'
import { Route as NavbarLayoutAuthEQuestionsIndexImport } from './routes/_navbar-layout._auth.e.questions.index'
import { Route as NavbarLayoutAuthEGamesIndexImport } from './routes/_navbar-layout._auth.e.games.index'
import { Route as NavbarLayoutAuthEQuestionsQuestionIdImport } from './routes/_navbar-layout._auth.e.questions.$questionId'
import { Route as NavbarLayoutAuthEGamesGameIdImport } from './routes/_navbar-layout._auth.e.games.$gameId'

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

const NavbarLayoutAuthRoute = NavbarLayoutAuthImport.update({
  id: '/_auth',
  getParentRoute: () => NavbarLayoutRoute,
} as any)

const NavbarLayoutAuthERoute = NavbarLayoutAuthEImport.update({
  path: '/e',
  getParentRoute: () => NavbarLayoutAuthRoute,
} as any)

const NavbarLayoutAuthCRoute = NavbarLayoutAuthCImport.update({
  path: '/c',
  getParentRoute: () => NavbarLayoutAuthRoute,
} as any)

const NavbarLayoutAuthActiveRoute = NavbarLayoutAuthActiveImport.update({
  path: '/active',
  getParentRoute: () => NavbarLayoutAuthRoute,
} as any)

const AuthCGameInstanceIdRoute = AuthCGameInstanceIdImport.update({
  path: '/c/$gameInstanceId',
  getParentRoute: () => rootRoute,
} as any)

const NavbarLayoutAuthEIndexRoute = NavbarLayoutAuthEIndexImport.update({
  path: '/',
  getParentRoute: () => NavbarLayoutAuthERoute,
} as any)

const NavbarLayoutAuthCIndexRoute = NavbarLayoutAuthCIndexImport.update({
  path: '/',
  getParentRoute: () => NavbarLayoutAuthCRoute,
} as any)

const AuthCGameInstanceIdIndexRoute = AuthCGameInstanceIdIndexImport.update({
  path: '/',
  getParentRoute: () => AuthCGameInstanceIdRoute,
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

const NavbarLayoutAuthCNewRoute = NavbarLayoutAuthCNewImport.update({
  path: '/new',
  getParentRoute: () => NavbarLayoutAuthCRoute,
} as any)

const NavbarLayoutAuthCContinueRoute = NavbarLayoutAuthCContinueImport.update({
  path: '/continue',
  getParentRoute: () => NavbarLayoutAuthCRoute,
} as any)

const AuthCGameInstanceIdQuestionIdRoute =
  AuthCGameInstanceIdQuestionIdImport.update({
    path: '/$questionId',
    getParentRoute: () => AuthCGameInstanceIdRoute,
  } as any)

const NavbarLayoutAuthEQuestionsIndexRoute =
  NavbarLayoutAuthEQuestionsIndexImport.update({
    path: '/',
    getParentRoute: () => NavbarLayoutAuthEQuestionsRoute,
  } as any)

const NavbarLayoutAuthEGamesIndexRoute =
  NavbarLayoutAuthEGamesIndexImport.update({
    path: '/',
    getParentRoute: () => NavbarLayoutAuthEGamesRoute,
  } as any)

const NavbarLayoutAuthEQuestionsQuestionIdRoute =
  NavbarLayoutAuthEQuestionsQuestionIdImport.update({
    path: '/$questionId',
    getParentRoute: () => NavbarLayoutAuthEQuestionsRoute,
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
    '/_navbar-layout/_auth': {
      id: '/_navbar-layout/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof NavbarLayoutAuthImport
      parentRoute: typeof NavbarLayoutImport
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
    '/_auth/c/$gameInstanceId': {
      id: '/_auth/c/$gameInstanceId'
      path: '/c/$gameInstanceId'
      fullPath: '/c/$gameInstanceId'
      preLoaderRoute: typeof AuthCGameInstanceIdImport
      parentRoute: typeof rootRoute
    }
    '/_navbar-layout/_auth/active': {
      id: '/_navbar-layout/_auth/active'
      path: '/active'
      fullPath: '/active'
      preLoaderRoute: typeof NavbarLayoutAuthActiveImport
      parentRoute: typeof NavbarLayoutAuthImport
    }
    '/_navbar-layout/_auth/c': {
      id: '/_navbar-layout/_auth/c'
      path: '/c'
      fullPath: '/c'
      preLoaderRoute: typeof NavbarLayoutAuthCImport
      parentRoute: typeof NavbarLayoutAuthImport
    }
    '/_navbar-layout/_auth/e': {
      id: '/_navbar-layout/_auth/e'
      path: '/e'
      fullPath: '/e'
      preLoaderRoute: typeof NavbarLayoutAuthEImport
      parentRoute: typeof NavbarLayoutAuthImport
    }
    '/_auth/c/$gameInstanceId/$questionId': {
      id: '/_auth/c/$gameInstanceId/$questionId'
      path: '/$questionId'
      fullPath: '/c/$gameInstanceId/$questionId'
      preLoaderRoute: typeof AuthCGameInstanceIdQuestionIdImport
      parentRoute: typeof AuthCGameInstanceIdImport
    }
    '/_navbar-layout/_auth/c/continue': {
      id: '/_navbar-layout/_auth/c/continue'
      path: '/continue'
      fullPath: '/c/continue'
      preLoaderRoute: typeof NavbarLayoutAuthCContinueImport
      parentRoute: typeof NavbarLayoutAuthCImport
    }
    '/_navbar-layout/_auth/c/new': {
      id: '/_navbar-layout/_auth/c/new'
      path: '/new'
      fullPath: '/c/new'
      preLoaderRoute: typeof NavbarLayoutAuthCNewImport
      parentRoute: typeof NavbarLayoutAuthCImport
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
    '/_auth/c/$gameInstanceId/': {
      id: '/_auth/c/$gameInstanceId/'
      path: '/'
      fullPath: '/c/$gameInstanceId/'
      preLoaderRoute: typeof AuthCGameInstanceIdIndexImport
      parentRoute: typeof AuthCGameInstanceIdImport
    }
    '/_navbar-layout/_auth/c/': {
      id: '/_navbar-layout/_auth/c/'
      path: '/'
      fullPath: '/c/'
      preLoaderRoute: typeof NavbarLayoutAuthCIndexImport
      parentRoute: typeof NavbarLayoutAuthCImport
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
    '/_navbar-layout/_auth/e/questions/$questionId': {
      id: '/_navbar-layout/_auth/e/questions/$questionId'
      path: '/$questionId'
      fullPath: '/e/questions/$questionId'
      preLoaderRoute: typeof NavbarLayoutAuthEQuestionsQuestionIdImport
      parentRoute: typeof NavbarLayoutAuthEQuestionsImport
    }
    '/_navbar-layout/_auth/e/games/': {
      id: '/_navbar-layout/_auth/e/games/'
      path: '/'
      fullPath: '/e/games/'
      preLoaderRoute: typeof NavbarLayoutAuthEGamesIndexImport
      parentRoute: typeof NavbarLayoutAuthEGamesImport
    }
    '/_navbar-layout/_auth/e/questions/': {
      id: '/_navbar-layout/_auth/e/questions/'
      path: '/'
      fullPath: '/e/questions/'
      preLoaderRoute: typeof NavbarLayoutAuthEQuestionsIndexImport
      parentRoute: typeof NavbarLayoutAuthEQuestionsImport
    }
  }
}

// Create and export the route tree

interface NavbarLayoutAuthCRouteChildren {
  NavbarLayoutAuthCContinueRoute: typeof NavbarLayoutAuthCContinueRoute
  NavbarLayoutAuthCNewRoute: typeof NavbarLayoutAuthCNewRoute
  NavbarLayoutAuthCIndexRoute: typeof NavbarLayoutAuthCIndexRoute
}

const NavbarLayoutAuthCRouteChildren: NavbarLayoutAuthCRouteChildren = {
  NavbarLayoutAuthCContinueRoute: NavbarLayoutAuthCContinueRoute,
  NavbarLayoutAuthCNewRoute: NavbarLayoutAuthCNewRoute,
  NavbarLayoutAuthCIndexRoute: NavbarLayoutAuthCIndexRoute,
}

const NavbarLayoutAuthCRouteWithChildren =
  NavbarLayoutAuthCRoute._addFileChildren(NavbarLayoutAuthCRouteChildren)

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

interface NavbarLayoutAuthEQuestionsRouteChildren {
  NavbarLayoutAuthEQuestionsQuestionIdRoute: typeof NavbarLayoutAuthEQuestionsQuestionIdRoute
  NavbarLayoutAuthEQuestionsIndexRoute: typeof NavbarLayoutAuthEQuestionsIndexRoute
}

const NavbarLayoutAuthEQuestionsRouteChildren: NavbarLayoutAuthEQuestionsRouteChildren =
  {
    NavbarLayoutAuthEQuestionsQuestionIdRoute:
      NavbarLayoutAuthEQuestionsQuestionIdRoute,
    NavbarLayoutAuthEQuestionsIndexRoute: NavbarLayoutAuthEQuestionsIndexRoute,
  }

const NavbarLayoutAuthEQuestionsRouteWithChildren =
  NavbarLayoutAuthEQuestionsRoute._addFileChildren(
    NavbarLayoutAuthEQuestionsRouteChildren,
  )

interface NavbarLayoutAuthERouteChildren {
  NavbarLayoutAuthEGamesRoute: typeof NavbarLayoutAuthEGamesRouteWithChildren
  NavbarLayoutAuthEQuestionsRoute: typeof NavbarLayoutAuthEQuestionsRouteWithChildren
  NavbarLayoutAuthEIndexRoute: typeof NavbarLayoutAuthEIndexRoute
}

const NavbarLayoutAuthERouteChildren: NavbarLayoutAuthERouteChildren = {
  NavbarLayoutAuthEGamesRoute: NavbarLayoutAuthEGamesRouteWithChildren,
  NavbarLayoutAuthEQuestionsRoute: NavbarLayoutAuthEQuestionsRouteWithChildren,
  NavbarLayoutAuthEIndexRoute: NavbarLayoutAuthEIndexRoute,
}

const NavbarLayoutAuthERouteWithChildren =
  NavbarLayoutAuthERoute._addFileChildren(NavbarLayoutAuthERouteChildren)

interface NavbarLayoutAuthRouteChildren {
  NavbarLayoutAuthActiveRoute: typeof NavbarLayoutAuthActiveRoute
  NavbarLayoutAuthCRoute: typeof NavbarLayoutAuthCRouteWithChildren
  NavbarLayoutAuthERoute: typeof NavbarLayoutAuthERouteWithChildren
}

const NavbarLayoutAuthRouteChildren: NavbarLayoutAuthRouteChildren = {
  NavbarLayoutAuthActiveRoute: NavbarLayoutAuthActiveRoute,
  NavbarLayoutAuthCRoute: NavbarLayoutAuthCRouteWithChildren,
  NavbarLayoutAuthERoute: NavbarLayoutAuthERouteWithChildren,
}

const NavbarLayoutAuthRouteWithChildren =
  NavbarLayoutAuthRoute._addFileChildren(NavbarLayoutAuthRouteChildren)

interface NavbarLayoutRouteChildren {
  NavbarLayoutAuthRoute: typeof NavbarLayoutAuthRouteWithChildren
  NavbarLayoutIndexRoute: typeof NavbarLayoutIndexRoute
}

const NavbarLayoutRouteChildren: NavbarLayoutRouteChildren = {
  NavbarLayoutAuthRoute: NavbarLayoutAuthRouteWithChildren,
  NavbarLayoutIndexRoute: NavbarLayoutIndexRoute,
}

const NavbarLayoutRouteWithChildren = NavbarLayoutRoute._addFileChildren(
  NavbarLayoutRouteChildren,
)

interface AuthCGameInstanceIdRouteChildren {
  AuthCGameInstanceIdQuestionIdRoute: typeof AuthCGameInstanceIdQuestionIdRoute
  AuthCGameInstanceIdIndexRoute: typeof AuthCGameInstanceIdIndexRoute
}

const AuthCGameInstanceIdRouteChildren: AuthCGameInstanceIdRouteChildren = {
  AuthCGameInstanceIdQuestionIdRoute: AuthCGameInstanceIdQuestionIdRoute,
  AuthCGameInstanceIdIndexRoute: AuthCGameInstanceIdIndexRoute,
}

const AuthCGameInstanceIdRouteWithChildren =
  AuthCGameInstanceIdRoute._addFileChildren(AuthCGameInstanceIdRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof NavbarLayoutAuthRouteWithChildren
  '/login': typeof LoginRoute
  '/about': typeof AboutLazyRoute
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/': typeof NavbarLayoutIndexRoute
  '/c/$gameInstanceId': typeof AuthCGameInstanceIdRouteWithChildren
  '/active': typeof NavbarLayoutAuthActiveRoute
  '/c': typeof NavbarLayoutAuthCRouteWithChildren
  '/e': typeof NavbarLayoutAuthERouteWithChildren
  '/c/$gameInstanceId/$questionId': typeof AuthCGameInstanceIdQuestionIdRoute
  '/c/continue': typeof NavbarLayoutAuthCContinueRoute
  '/c/new': typeof NavbarLayoutAuthCNewRoute
  '/e/games': typeof NavbarLayoutAuthEGamesRouteWithChildren
  '/e/questions': typeof NavbarLayoutAuthEQuestionsRouteWithChildren
  '/c/$gameInstanceId/': typeof AuthCGameInstanceIdIndexRoute
  '/c/': typeof NavbarLayoutAuthCIndexRoute
  '/e/': typeof NavbarLayoutAuthEIndexRoute
  '/e/games/$gameId': typeof NavbarLayoutAuthEGamesGameIdRoute
  '/e/questions/$questionId': typeof NavbarLayoutAuthEQuestionsQuestionIdRoute
  '/e/games/': typeof NavbarLayoutAuthEGamesIndexRoute
  '/e/questions/': typeof NavbarLayoutAuthEQuestionsIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/about': typeof AboutLazyRoute
  '': typeof NavbarLayoutAuthRouteWithChildren
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/': typeof NavbarLayoutIndexRoute
  '/active': typeof NavbarLayoutAuthActiveRoute
  '/c/$gameInstanceId/$questionId': typeof AuthCGameInstanceIdQuestionIdRoute
  '/c/continue': typeof NavbarLayoutAuthCContinueRoute
  '/c/new': typeof NavbarLayoutAuthCNewRoute
  '/c/$gameInstanceId': typeof AuthCGameInstanceIdIndexRoute
  '/c': typeof NavbarLayoutAuthCIndexRoute
  '/e': typeof NavbarLayoutAuthEIndexRoute
  '/e/games/$gameId': typeof NavbarLayoutAuthEGamesGameIdRoute
  '/e/questions/$questionId': typeof NavbarLayoutAuthEQuestionsQuestionIdRoute
  '/e/games': typeof NavbarLayoutAuthEGamesIndexRoute
  '/e/questions': typeof NavbarLayoutAuthEQuestionsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_navbar-layout': typeof NavbarLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/about': typeof AboutLazyRoute
  '/_navbar-layout/_auth': typeof NavbarLayoutAuthRouteWithChildren
  '/g/$gameInstanceId': typeof GGameInstanceIdRoute
  '/_navbar-layout/': typeof NavbarLayoutIndexRoute
  '/_auth/c/$gameInstanceId': typeof AuthCGameInstanceIdRouteWithChildren
  '/_navbar-layout/_auth/active': typeof NavbarLayoutAuthActiveRoute
  '/_navbar-layout/_auth/c': typeof NavbarLayoutAuthCRouteWithChildren
  '/_navbar-layout/_auth/e': typeof NavbarLayoutAuthERouteWithChildren
  '/_auth/c/$gameInstanceId/$questionId': typeof AuthCGameInstanceIdQuestionIdRoute
  '/_navbar-layout/_auth/c/continue': typeof NavbarLayoutAuthCContinueRoute
  '/_navbar-layout/_auth/c/new': typeof NavbarLayoutAuthCNewRoute
  '/_navbar-layout/_auth/e/games': typeof NavbarLayoutAuthEGamesRouteWithChildren
  '/_navbar-layout/_auth/e/questions': typeof NavbarLayoutAuthEQuestionsRouteWithChildren
  '/_auth/c/$gameInstanceId/': typeof AuthCGameInstanceIdIndexRoute
  '/_navbar-layout/_auth/c/': typeof NavbarLayoutAuthCIndexRoute
  '/_navbar-layout/_auth/e/': typeof NavbarLayoutAuthEIndexRoute
  '/_navbar-layout/_auth/e/games/$gameId': typeof NavbarLayoutAuthEGamesGameIdRoute
  '/_navbar-layout/_auth/e/questions/$questionId': typeof NavbarLayoutAuthEQuestionsQuestionIdRoute
  '/_navbar-layout/_auth/e/games/': typeof NavbarLayoutAuthEGamesIndexRoute
  '/_navbar-layout/_auth/e/questions/': typeof NavbarLayoutAuthEQuestionsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/about'
    | '/g/$gameInstanceId'
    | '/'
    | '/c/$gameInstanceId'
    | '/active'
    | '/c'
    | '/e'
    | '/c/$gameInstanceId/$questionId'
    | '/c/continue'
    | '/c/new'
    | '/e/games'
    | '/e/questions'
    | '/c/$gameInstanceId/'
    | '/c/'
    | '/e/'
    | '/e/games/$gameId'
    | '/e/questions/$questionId'
    | '/e/games/'
    | '/e/questions/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/about'
    | ''
    | '/g/$gameInstanceId'
    | '/'
    | '/active'
    | '/c/$gameInstanceId/$questionId'
    | '/c/continue'
    | '/c/new'
    | '/c/$gameInstanceId'
    | '/c'
    | '/e'
    | '/e/games/$gameId'
    | '/e/questions/$questionId'
    | '/e/games'
    | '/e/questions'
  id:
    | '__root__'
    | '/_navbar-layout'
    | '/login'
    | '/about'
    | '/_navbar-layout/_auth'
    | '/g/$gameInstanceId'
    | '/_navbar-layout/'
    | '/_auth/c/$gameInstanceId'
    | '/_navbar-layout/_auth/active'
    | '/_navbar-layout/_auth/c'
    | '/_navbar-layout/_auth/e'
    | '/_auth/c/$gameInstanceId/$questionId'
    | '/_navbar-layout/_auth/c/continue'
    | '/_navbar-layout/_auth/c/new'
    | '/_navbar-layout/_auth/e/games'
    | '/_navbar-layout/_auth/e/questions'
    | '/_auth/c/$gameInstanceId/'
    | '/_navbar-layout/_auth/c/'
    | '/_navbar-layout/_auth/e/'
    | '/_navbar-layout/_auth/e/games/$gameId'
    | '/_navbar-layout/_auth/e/questions/$questionId'
    | '/_navbar-layout/_auth/e/games/'
    | '/_navbar-layout/_auth/e/questions/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  NavbarLayoutRoute: typeof NavbarLayoutRouteWithChildren
  LoginRoute: typeof LoginRoute
  AboutLazyRoute: typeof AboutLazyRoute
  GGameInstanceIdRoute: typeof GGameInstanceIdRoute
  AuthCGameInstanceIdRoute: typeof AuthCGameInstanceIdRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  NavbarLayoutRoute: NavbarLayoutRouteWithChildren,
  LoginRoute: LoginRoute,
  AboutLazyRoute: AboutLazyRoute,
  GGameInstanceIdRoute: GGameInstanceIdRoute,
  AuthCGameInstanceIdRoute: AuthCGameInstanceIdRouteWithChildren,
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
        "/g/$gameInstanceId",
        "/_auth/c/$gameInstanceId"
      ]
    },
    "/_navbar-layout": {
      "filePath": "_navbar-layout.tsx",
      "children": [
        "/_navbar-layout/_auth",
        "/_navbar-layout/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/_navbar-layout/_auth": {
      "filePath": "_navbar-layout._auth.tsx",
      "parent": "/_navbar-layout",
      "children": [
        "/_navbar-layout/_auth/active",
        "/_navbar-layout/_auth/c",
        "/_navbar-layout/_auth/e"
      ]
    },
    "/g/$gameInstanceId": {
      "filePath": "g.$gameInstanceId.tsx"
    },
    "/_navbar-layout/": {
      "filePath": "_navbar-layout.index.tsx",
      "parent": "/_navbar-layout"
    },
    "/_auth/c/$gameInstanceId": {
      "filePath": "_auth.c.$gameInstanceId.tsx",
      "children": [
        "/_auth/c/$gameInstanceId/$questionId",
        "/_auth/c/$gameInstanceId/"
      ]
    },
    "/_navbar-layout/_auth/active": {
      "filePath": "_navbar-layout._auth.active.tsx",
      "parent": "/_navbar-layout/_auth"
    },
    "/_navbar-layout/_auth/c": {
      "filePath": "_navbar-layout._auth.c.tsx",
      "parent": "/_navbar-layout/_auth",
      "children": [
        "/_navbar-layout/_auth/c/continue",
        "/_navbar-layout/_auth/c/new",
        "/_navbar-layout/_auth/c/"
      ]
    },
    "/_navbar-layout/_auth/e": {
      "filePath": "_navbar-layout._auth.e.tsx",
      "parent": "/_navbar-layout/_auth",
      "children": [
        "/_navbar-layout/_auth/e/games",
        "/_navbar-layout/_auth/e/questions",
        "/_navbar-layout/_auth/e/"
      ]
    },
    "/_auth/c/$gameInstanceId/$questionId": {
      "filePath": "_auth.c.$gameInstanceId.$questionId.tsx",
      "parent": "/_auth/c/$gameInstanceId"
    },
    "/_navbar-layout/_auth/c/continue": {
      "filePath": "_navbar-layout._auth.c.continue.tsx",
      "parent": "/_navbar-layout/_auth/c"
    },
    "/_navbar-layout/_auth/c/new": {
      "filePath": "_navbar-layout._auth.c.new.tsx",
      "parent": "/_navbar-layout/_auth/c"
    },
    "/_navbar-layout/_auth/e/games": {
      "filePath": "_navbar-layout._auth.e.games.tsx",
      "parent": "/_navbar-layout/_auth/e",
      "children": [
        "/_navbar-layout/_auth/e/games/$gameId",
        "/_navbar-layout/_auth/e/games/"
      ]
    },
    "/_navbar-layout/_auth/e/questions": {
      "filePath": "_navbar-layout._auth.e.questions.tsx",
      "parent": "/_navbar-layout/_auth/e",
      "children": [
        "/_navbar-layout/_auth/e/questions/$questionId",
        "/_navbar-layout/_auth/e/questions/"
      ]
    },
    "/_auth/c/$gameInstanceId/": {
      "filePath": "_auth.c.$gameInstanceId.index.tsx",
      "parent": "/_auth/c/$gameInstanceId"
    },
    "/_navbar-layout/_auth/c/": {
      "filePath": "_navbar-layout._auth.c.index.tsx",
      "parent": "/_navbar-layout/_auth/c"
    },
    "/_navbar-layout/_auth/e/": {
      "filePath": "_navbar-layout._auth.e.index.tsx",
      "parent": "/_navbar-layout/_auth/e"
    },
    "/_navbar-layout/_auth/e/games/$gameId": {
      "filePath": "_navbar-layout._auth.e.games.$gameId.tsx",
      "parent": "/_navbar-layout/_auth/e/games"
    },
    "/_navbar-layout/_auth/e/questions/$questionId": {
      "filePath": "_navbar-layout._auth.e.questions.$questionId.tsx",
      "parent": "/_navbar-layout/_auth/e/questions"
    },
    "/_navbar-layout/_auth/e/games/": {
      "filePath": "_navbar-layout._auth.e.games.index.tsx",
      "parent": "/_navbar-layout/_auth/e/games"
    },
    "/_navbar-layout/_auth/e/questions/": {
      "filePath": "_navbar-layout._auth.e.questions.index.tsx",
      "parent": "/_navbar-layout/_auth/e/questions"
    }
  }
}
ROUTE_MANIFEST_END */

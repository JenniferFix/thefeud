import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseAuthProvider, useSupabaseAuth } from './supabaseauth';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PostHogProvider } from 'posthog-js/react';
import * as Sentry from '@sentry/react';

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined,
  },
  defaultPreload: 'intent',
});

Sentry.init({
  dsn: 'https://b8f0881597a9bc67855a930d3285ef79@o4508197322686464.ingest.us.sentry.io/4508197337825280',
  integrations: [
    Sentry.tanstackRouterBrowserTracingIntegration(router),
    // Sentry.browserTracingIntegration(),
    // Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
// ${<Include name="code-comments/javascript/trace-sample-rate" />}

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  const auth = useSupabaseAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="FeudTheme">
        <PostHogProvider
          apiKey={import.meta.env.VITE_POSTHOG_KEY}
          options={{ api_host: import.meta.env.VITE_POSTHOG_HOST }}
        >
          <RouterProvider router={router} context={{ auth }} />
        </PostHogProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

function App() {
  return (
    <SupabaseAuthProvider>
      <InnerApp />
    </SupabaseAuthProvider>
  );
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

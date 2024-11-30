import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseAuthProvider, useSupabaseAuth } from './supabaseauth';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PostHogProvider } from 'posthog-js/react';

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

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { lazy } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';

import appState from './data/AppState';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = lazy(() =>
  import('react-toastify').then((module) => ({ default: module.ToastContainer }))
);
const Router = lazy(() => import('./routes'));
const Loading = lazy(() => import('./components/Loading'));

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// add before using: "@tanstack/react-query-devtools": "^5.18.1",
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

appState.__init__();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <main className="font-poppins box-border smooth-scroll h-[100%] w-[100%] overflow-hidden">
        <Suspense fallback={<Loading />}>
          <Router />
          <ToastContainer theme="dark" autoClose={1500} />
        </Suspense>
        {/* ! USE FOR DEV MODE ONLY */}
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </main>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import appState from './data/AppState';
import routes from './routes';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// add before using: "@tanstack/react-query-devtools": "^5.18.1",
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

appState.__init__();

// Initialize Firebase
const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <main className="font-poppins box-border smooth-scroll h-[100%] w-[100%] overflow-hidden">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={routes} />
        </Suspense>
        <ToastContainer theme="dark" autoClose={1500} />
        {/* ! USE FOR DEV MODE ONLY */}
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </main>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

// To use Firebase Storage:
const storage = getStorage(app);
export default storage;

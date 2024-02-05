import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import appState from "./data/AppState";
import routes from "./routes";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";

appState.__init__();

// Initialize Firebase
const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <main className="font-poppins box-border smooth-scroll h-[100%] w-[100%] overflow-hidden">
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routes} />
      </Suspense>
      <ToastContainer theme="dark" autoClose={1500} />
    </main>
  </GoogleOAuthProvider>
);

// To use Firebase Storage:
const storage = getStorage(app);
export default storage;

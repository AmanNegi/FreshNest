import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import Login from "./pages/Auth/presentation/Login";
import Landing from "./pages/Landing/presentation/Landing";
import Shop from "./pages/shop/presentation/Shop";
import About from "./pages/About/presentation/about";
import ItemDetail from "./pages/shop/presentation/ItemDetail";
import Search from "./pages/Search/presentation/Search";
import Profile from "./pages/Profile/presentation/Profile";
import CartPage from "./pages/Cart/presentation/Cart";
import AddItem from "./pages/AddItem/presentation/AddItem";
import SignUp from "./pages/Auth/presentation/SignUp";

import appState from "./data/AppState";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Landing />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/item/:id",
    element: <ItemDetail />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/add",
    element: <AddItem />,
  },
]);

appState.__init__();

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
      <RouterProvider router={router} />
      <ToastContainer theme="dark" autoClose={1500} />
    </main>
  </GoogleOAuthProvider>,
);

const storage = getStorage(app);
export default storage;

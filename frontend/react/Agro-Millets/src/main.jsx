import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login/presentation/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home/presentation/Home";
import Shop from "./pages/shop/presentation/Shop";
import About from "./pages/About/presentation/about";
import ItemDetail from "./pages/shop/presentation/ItemDetail";
import "@fortawesome/fontawesome-free/css/all.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./pages/Search/presentation/Search";
import authManager from "./data/AuthRepository";
import Profile from "./pages/Profile/presentation/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
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
]);

authManager.__init__();

ReactDOM.createRoot(document.getElementById("root")).render(
  <main className="font-poppins box-border smooth-scroll h-[100%] w-[100%] overflow-hidden">
    <RouterProvider router={router} />
    <ToastContainer theme="dark" />
  </main>
);

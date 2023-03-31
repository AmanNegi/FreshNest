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
    element: <About/>,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <main className="font-poppins box-border smooth-scroll h-[100%] w-[100%]">
    <RouterProvider router={router} />
  </main>
);

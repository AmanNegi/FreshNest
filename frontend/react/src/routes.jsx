import { Outlet, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/Error";

const Login = lazy(() => import("./pages/Auth/presentation/Login"));
const Landing = lazy(() => import("./pages/Landing/presentation/Landing"));
const Shop = lazy(() => import("./pages/shop/presentation/Shop"));
const About = lazy(() => import("./pages/About/presentation/about"));
const ItemDetail = lazy(() => import("./pages/shop/presentation/ItemDetail"));
const Search = lazy(() => import("./pages/Search/presentation/Search"));
const Profile = lazy(() => import("./pages/Profile/presentation/Profile"));
const CartPage = lazy(() => import("./pages/Cart/presentation/Cart"));
const AddItem = lazy(() => import("./pages/AddItem/presentation/AddItem"));
const SignUp = lazy(() => import("./pages/Auth/presentation/SignUp"));

const routes = createBrowserRouter([
  {
    path: "/auth",

    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "",
    errorElement: (
      <>
        <NavBar />
        <ErrorPage />
        <Footer />
      </>
    ),
    element: (
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Landing />,
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
    ],
  },
]);

export default routes;

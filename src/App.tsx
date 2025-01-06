import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/Home";
import Course from "@/pages/course/Course";
import Test from "@/pages/test/Test";
import Login from "@/pages/auth/Login";
import Profile from "@/pages/profile/Profile";
import Layout from "./components/layout/layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/",

      element: <h2>Hello Auth</h2>, //TODO replace this with public pages layout
      children: [
        { path: "", element: <Home /> }, //TODO Import Public Landing Page with link to login
        { path: "login", element: <Login /> }, //? Login Page Route
      ],
    },

    {
      path: "/",
      element: <Layout />, //TODO Replace with dashboard layout for desired roles
      children: [
        { path: "", element: <Home /> }, //? Welcome Screen
        {
          path: "courses",
          element: <Course />, //? Courses Listing and Add Routes
        },
        {
          path: "test",
          element: <Test />, //? Tests Route
        },
        {
          path: "profile",
          element: <Profile />, //? Profile Route
        },
      ],
    },
    {
      path: "*",
      element: <h2>Page Not Found</h2>,
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;

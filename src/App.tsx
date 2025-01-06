import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "@/Home";
import Course from "@/pages/course/Course";
import Test from "@/pages/test/Test";
import Login from "@/pages/auth/Login";
import Profile from "@/pages/profile/Profile";
import PrivateLayout from "@/layouts/PrivateLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/",

      element: <Outlet />,
      children: [
        { path: "", element: <Home /> }, 
        { path: "login", element: <Login /> }, 
      ],
    },

    {
      path: "/",
<<<<<<< HEAD
      element: <Layout />,
=======
      element: <PrivateLayout />, //TODO Replace with dashboard layout for desired roles
>>>>>>> ef58de4d12dea500f377a09c05b5b68f87b88ebd
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

  return <RouterProvider router={router} />;
}

export default App;

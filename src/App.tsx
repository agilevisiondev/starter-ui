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
      element: <PrivateLayout />, 
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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/Home";
import Course from "@/pages/course/Course";
import Test from "@/pages/test/Test";
import Login from "@/pages/auth/Login";
import Profile from "@/pages/profile/Profile";
import { ThemeProvider } from "@/components/theme-provider";
import PrivateLayout from "@/layouts/PrivateLayout";
import { AddCourse } from "./pages/course/AddCourse";
import PublicLayout from "@/layouts/PublicLayout";
import Content from "./pages/course/Content";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/",
      element: <PublicLayout />,
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
          path: "course",
          element: <Course />, //? Course Listing and Add Routes
        },
        {
          path: "content",
          element: <Content />, //? Course Listing and Add Routes
        },
        {
          path: "add-course",
          element: <AddCourse />, //? Courses Listing and Add Routes
        },

        {
          path: "test",
          element: <Test />, //? Tests Route
        },
        {
          path: "profile",
          element: <Profile />, //? Profile Route
        },
        {
          path: "*",
          element: <h2>Page Not Found</h2>,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

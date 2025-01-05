import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/Home";
import Course from "@/pages/course/Course";
import Test from "@/pages/test/Test";
import Login from "@/pages/auth/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/",
      element: <h2>Hello Auth</h2>,
      children: [{ path: "", element: <Login /> }],
    },

    {
      path: "/",
      element: <h2>Authenticated Routes</h2>,
      children: [
        { path: "", element: <Home /> },
        {
          path: "courses",
          element: <Course />,
        },
        {
          path: "test",
          element: <Test />,
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

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "@/pages/auth/Login"
import { Theme, ThemeProvider } from "@/components/theme-provider"
import PublicLayout from "@/layouts/PublicLayout"
import PrivateRoutes from "@/routes/PrivateRoutes"

function App() {
  const router = createBrowserRouter([
    {
      path: "/auth/",
      element: <PublicLayout />,
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
      ],
    },
    PrivateRoutes(),
  ])
  return (
    <ThemeProvider defaultTheme={Theme.SYSTEM} storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

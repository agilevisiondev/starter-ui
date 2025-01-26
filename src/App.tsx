import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Theme, ThemeProvider } from "@/components/theme-provider"
import PrivateRoutes from "@/routes/PrivateRoutes"
import PublicRoutes from "@/routes/PublicRoutes"

function App() {
  const router = createBrowserRouter([PublicRoutes(), PrivateRoutes()])
  return (
    <ThemeProvider defaultTheme={Theme.SYSTEM} storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

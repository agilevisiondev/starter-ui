import { Navigate } from "react-router-dom"
import Login from "@/pages/auth/Login"
import PublicLayout from "@/layouts/PublicLayout"

export default function PublicRoutes() {
  const isLoggedIn = localStorage.getItem("token")
  return {
    path: "/auth/",
    element: isLoggedIn ? <Navigate to="/" /> : <PublicLayout />,
    children: [
      { path: "", element: <Login /> },
      { path: "login", element: <Login /> },
    ],
  }
}

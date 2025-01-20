import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "@/Home"
import Test from "@/pages/test/old/Tests"
import Login from "@/pages/auth/Login"
import Profile from "@/pages/profile/Profile"
import { Theme, ThemeProvider } from "@/components/theme-provider"
import PrivateLayout from "@/layouts/PrivateLayout"
import PublicLayout from "@/layouts/PublicLayout"
import Course from "@/pages/course/Courses"
import AddCourse from "@/pages/course/AddCourse"
import Chapter from "@/pages/course/Chapters"
import AddChapter from "@/pages/course/AddChapter"

import ContentUpload from "@/pages/course/content/ContentUpload"
import Content from "@/pages/course/content/Content"
import QuestionBank from "@/pages/test/QuestionBank"
import AddTest from "@/pages/test/AddTest"
import TestListing from "./pages/test/TestListing"
import TestPage from "./pages/test/TestPage"

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
          path: "courses",
          element: <Course />, //? Course Listing and Add Routes
        },
        {
          path: "chapters",
          element: <Chapter />, //? Chapters Listing and Add Routes
        },
        {
          path: "add-chapter",
          element: <AddChapter />, //? Add Chapters and Add Routes
        },
        {
          path: "content",
          element: <Content />, //? Course Listing and Add Routes
        },
        {
          path: "add-course",
          element: <AddCourse />, //? Add Course and Add Routes
        },
        {
          path: "add-test",
          element: <AddTest />, //? Tests Route
        },
        {
          path: "tests",
          element: <TestListing />, //? Tests Route
        },
        {
          path: "uploadContent",
          element: <ContentUpload />, //? Courses Listing and Add Routes
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
        {
          path: "question",
          element: <QuestionBank />,
        },
        {
          path: "take-test",
          element: <TestPage />, // Main test page Route
        },
      ],
    },
  ])
  return (
    <ThemeProvider defaultTheme={Theme.SYSTEM} storageKey="ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

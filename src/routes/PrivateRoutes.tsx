import { Navigate } from "react-router-dom"
import Home from "@/Home"
import Test from "@/pages/test/old/Tests"
import Profile from "@/pages/profile/Profile"
import PrivateLayout from "@/layouts/PrivateLayout"
import Course from "@/pages/course/Courses"
import AddCourse from "@/pages/course/AddCourse"
import Chapter from "@/pages/course/Chapters"
import AddChapter from "@/pages/course/AddChapter"

import ContentUpload from "@/pages/course/content/ContentUpload"
import Content from "@/pages/course/content/Content"
import QuestionBank from "@/pages/test/QuestionBank"
import AddTest from "@/pages/test/AddTest"
import TestListing from "@/pages/test/TestListing"

export default function PrivateRoutes() {
  const isLoggedIn = localStorage.getItem("token")
  return {
    path: "/",
    element: isLoggedIn ? <PrivateLayout /> : <Navigate to="/auth/login" />,
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
    ],
  }
}

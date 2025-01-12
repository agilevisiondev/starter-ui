import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { Link, useNavigate } from "react-router-dom"
import { CourseCard } from "./AddCourse"
import { useEffect, useState } from "react"
interface Course {
  id: string
  title: string
  description: string
  color: string
  classes: number[]
}

const Courses = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    fetch("courses.json")
      .then((res) => res.json())
      .then((json) => {
        setCourses(json)
        console.log(json)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <DashboardPage>
      <div className="flex justify-between">
        <p className="mt-2 font-medium md:text-xl text-normal">Your Courses</p>
        <Link to="/add-course">
          <Button variant="default" size="sm" className="mb-5 md:px-8 md:h-11">
            Add Course
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses &&
          courses.map((card: Course) => {
            return (
              <div
                key={card.id}
                onClick={() =>
                  navigate("/chapters", {
                    state: {
                      chapterTitle: card.title,
                    },
                  })
                }
                className="cursor-pointer hover:scale-105 transition-all"
              >
                <CourseCard data={card} />
              </div>
            )
          })}
      </div>
    </DashboardPage>
  )
}

export default Courses

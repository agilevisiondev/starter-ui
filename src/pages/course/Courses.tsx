import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { Link } from "react-router-dom"
import { CourseCard } from "./AddCourse"
import { courses } from "@/lib/constants"

// course data schema for API
interface Course {
  id: string
  title: string
  description: string
  color: string
  classes: number[]
}

const Courses = () => {
  console.log(courses)
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {courses &&
          courses.map((card: Course) => {
            return (
              <div key={card.id}>
                <CourseCard data={card} />
              </div>
            )
          })}
      </div>
    </DashboardPage>
  )
}

export default Courses

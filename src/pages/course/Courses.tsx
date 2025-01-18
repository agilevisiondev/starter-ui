import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { Link, useNavigate } from "react-router-dom"
import { CourseCard } from "@/pages/course/AddCourse"
import { useEffect, useState } from "react"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
interface Course {
  id: string
  title: string
  description: string
  color: string
  classes: number[]
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  title: string
  description: string
  color: string
  classofChapter: string
  sections: { id: string; title: string }[]
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
      <DashboardPageTitle
        title="Your Courses"
        subTitle="Manage your account settings and set e-mail preferences."
        actionElement={
          <Link to="/add-chapter" className=" ">
            <Button variant="default" size="sm" className="mb-5 md:px-8 md:h-11">
              Add Chapter
            </Button>
          </Link>
        }
      />
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses &&
          courses.map((card: Course) => {
            return (
              <div
                key={card.id}
                onClick={() =>
                  navigate("/chapters", {
                    state: {
                      chapterTitle: card.title,
                      chapters: card.chapters,
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

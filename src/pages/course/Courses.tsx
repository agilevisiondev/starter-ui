import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { Link, useNavigate } from "react-router-dom"
import { CourseCard } from "@/pages/course/AddCourse"
import { useEffect, useState } from "react"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import { ICourse } from "@/interfaces/course"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Chapter {
  id: string
  title: string
  description: string
  color: string
  classofChapter: string
  sections: { id: string; title: string }[]
}

interface IClass {
  class_id: string
  classLabel: string
}

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [coursesList, setCoursesList] = useState<ICourse[]>([])
  const [classes, setClasses] = useState<IClass[]>([])
  const [selectedClass, setSelectedClass] = useState<string>("")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("courses.json")
      .then((res) => res.json())
      .then((json) => {
        setCourses(json)
        setCoursesList(json)
        console.log(json)
      })
      .catch((err) => console.log(err))
    fetch("classes.json")
      .then((res) => res.json())
      .then((json) => {
        setClasses(json)
        console.log(json)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (selectedClass !== "") {
      const filteredCourses = courses.filter((course) => course.class_id === Number(selectedClass))
      setCoursesList(filteredCourses)
    } else {
      setCoursesList(courses)
    }

    return () => {
      console.log("second")
    }
  }, [selectedClass])

  return (
    <DashboardPage>
      <DashboardPageTitle
        title="Your Courses"
        subTitle="Manage your courses."
        filterItems={
          <div className="flex">
            <Select onValueChange={setSelectedClass} value={selectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((item: IClass) => (
                  <SelectItem value={String(item.class_id)} key={item.class_id}>
                    {item.classLabel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size={"icon"}
              variant={"link"}
              className={`ml-2 h-6 self-center ${selectedClass === "" ? "hidden" : ""}`}
              onClick={() => setSelectedClass("")}
            >
              X
            </Button>
          </div>
        }
        actionElement={
          <Link to="/add-course">
            <Button>Create Course</Button>
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coursesList.length > 0 ? (
          coursesList.map((course: ICourse) => {
            return (
              <div key={course.course_id} className="cursor-pointer hover:scale-105 transition-all">
                <CourseCard data={course} />
              </div>
            )
          })
        ) : (
          <div>No courses found</div>
        )}
      </div>
    </DashboardPage>
  )
}

export default Courses

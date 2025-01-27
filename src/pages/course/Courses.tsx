import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { Link } from "react-router-dom"
import { CourseCard } from "@/pages/course/AddCourse"
import { useEffect, useState } from "react"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import { ICourse } from "@/interfaces/course"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

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
  const [subjects, setSubjects] = useState<any[]>([])

  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  // const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"))
  console.log(classes, "pro")
  useEffect(() => {
    fetch("courses.json")
      .then((res) => res.json())
      .then((json) => {
        setCourses(json)
        setCoursesList(json)
      })
      .catch((err) => console.log(err))
    fetch("subjects.json")
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json)
        const mySubjects = json.filter((item: any) => [1, 2, 3, 4, 5].includes(item.subject_id))
        setSubjects(mySubjects)
      })
      .catch((err) => console.log(err))
    fetch("classes.json")
      .then((res) => res.json())
      .then((json) => {
        // console.log("json", json)
        const myClasses = json.filter((item: IClass) => user.classes_assigned.includes(item.class_id))
        setClasses(myClasses)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    setCoursesList(courses)
    if (selectedClass !== "") {
      const filteredCourses = courses.filter((course) => course.class_id === Number(selectedClass))
      setCoursesList(filteredCourses)
      if (selectedSubject !== "") {
        // setSelectedSubjeˀ÷ct("")
        const filteredCourses = courses.filter(
          (course) => course.subject_id === Number(selectedClass + "0" + selectedSubject),
        )
        setCoursesList(filteredCourses)
      }
    } else {
      setCoursesList(courses)
      setSelectedSubject("")
    }
  }, [selectedClass, selectedSubject])

  return (
    <DashboardPage>
      <DashboardPageTitle
        title="Your Courses"
        subTitle="Manage your courses."
        filterItems={
          <div className="flex justify-around gap-6">
            <Label className="self-center mr-2">Filters</Label>
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
            <div className="flex">
              <Select onValueChange={setSelectedSubject} value={selectedSubject}>
                <SelectTrigger disabled={selectedClass === ""}>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((item: any) => (
                    <SelectItem value={String(item.subject_id)} key={item.subject_id}>
                      {item.subjectLabel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size={"icon"}
                variant={"link"}
                className={`ml-2 h-6 self-center ${selectedSubject === "" ? "hidden" : ""}`}
                onClick={() => setSelectedSubject("")}
              >
                X
              </Button>
            </div>
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

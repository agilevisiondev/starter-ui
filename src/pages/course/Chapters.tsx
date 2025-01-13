import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { courses } from "@/lib/constants"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CourseCard } from "./AddCourse"

export default function Chapters() {
  const { state } = useLocation()
  const navigate = useNavigate()
  return (
    <DashboardPage>
      <div className="flex justify-between">
        <p className="mt-2 font-medium md:text-xl text-normal">{state.chapterTitle}</p>
        <Link to="/add-chapter">
          <Button variant="default" size="sm" className="mb-5 md:px-8 md:h-11">
            Add Chapter
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses &&
          courses.map((card) => {
            return (
              <div
                key={card.id}
                className="cursor-pointer hover:scale-105 transition-all"
                onClick={() => navigate("/content")}
              >
                <CourseCard data={card} />
              </div>
            )
          })}
      </div>
    </DashboardPage>
  )
}

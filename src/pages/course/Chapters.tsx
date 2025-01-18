import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ChapterCard } from "@/pages/course/AddChapter"
import { Chapter } from "@/pages/course/Courses"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"

export default function Chapters() {
  const { state } = useLocation()
  const navigate = useNavigate()

  return (
    <DashboardPage>
      <DashboardPageTitle
        title={state.chapterTitle}
        subTitle="Manage chapters."
        actionElement={
          <Link to="/add-chapter">
            <Button>Add Chapter</Button>
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {state.chapters &&
          state.chapters.map((card: Chapter) => {
            return (
              <div
                key={card.id}
                className="cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/content")}
              >
                <ChapterCard data={card} />
              </div>
            )
          })}
      </div>
    </DashboardPage>
  )
}

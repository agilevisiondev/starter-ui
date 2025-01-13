import { Button } from "@/components/ui/button"
import DashboardPage from "@/layouts/DashboardPage"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ChapterCard } from "@/pages/course/AddChapter"
import { useEffect, useState } from "react"

interface Chapter {
  id: string
  title: string
  description: string
  color: string
  classofChapter: string
  chapters: { id: string; title: string }[]
}

export default function Chapters() {
  const [chapters, setChapters] = useState([])
  const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    fetch("chapters.json")
      .then((res) => res.json())
      .then((json) => {
        setChapters(json)
        console.log(json)
      })
      .catch((err) => console.log(err))
  }, [])
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
        {chapters &&
          chapters.map((card: Chapter) => {
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

import { Button } from "@/components/ui/button"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import DashboardPage from "@/layouts/DashboardPage"
import { Link, useNavigate } from "react-router-dom"
import { Timer } from "lucide-react"
import { useState } from "react"

export default function TestListing() {
  const navigate = useNavigate()

  const [tests, setTests] = useState(() => JSON.parse(localStorage.getItem("exams")) ?? [])
  return (
    <div>
      <DashboardPage>
        <DashboardPageTitle
          title="Your Assessments"
          subTitle="Manage your tests."
          actionElement={
            <Link to="/add-test">
              <Button>Add Test</Button>
            </Link>
          }
        />
        <div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((exam) => (
              <div key={exam.id} className="border rounded-xl ">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="p-1 text-xs font-medium bg-white rounded-xl dark:text-black">{exam.date}</p>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-xs font-medium">Class {exam.selectedClass}</h2>
                  </div>
                  <h2 className="text-2xl font-bold">{exam.name}</h2>
                  <div className="flex items-center justify-between mt-6">
                    <h2 className="text-xs font-semibold">{exam.attempts} Attempts</h2>
                    <h2 className="text-xs font-semibold">{Number(exam.questions?.length) + 1 + " Questions"} </h2>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="flex items-center gap-1 font-semibold text-md ">
                      <Timer size={20} color="red" />{" "}
                      <span className="text-black dark:text-white">{exam.duration}</span>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardPage>
    </div>
  )
}

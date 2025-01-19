import { Button } from "@/components/ui/button"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import DashboardPage from "@/layouts/DashboardPage"
import { Link, useNavigate } from "react-router-dom"
import { Timer } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
              <Button>Create Test</Button>
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((item) => (
            <Card className="max-w-sm hover:scale-105 transition-all duration-700">
              <CardHeader className="border-b py-4">
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-2 space-y-1 h-28">
                <CardDescription className="text-sm">{item.description}</CardDescription>
                <div className="pt-2 flex">
                  <Badge className="mr-2">Date: {item.date}</Badge>
                  <Badge>Class {item.selectedClass}</Badge>
                </div>
                {item.attempts && <p className="text-sm">Attempts: {item.attempts}</p>}
              </CardContent>
              <CardFooter className="border-t p-2 justify-between">
                <div className="flex">
                  <Timer size={20} color="red" />
                  <span className="ml-2">{item.duration}</span>
                </div>
                <p className="text-sm">Questions: {item.noOfQuestions}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DashboardPage>
    </div>
  )
}

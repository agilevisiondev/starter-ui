import AddTestForm from "./AddTestForm"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Exam } from "@/interfaces/test"
import { Timer, Trash } from "lucide-react"
import { useEffect, useState } from "react"

export default function Tests() {
  const [exams, setExams] = useState<Exam[]>([])

  const deleteTest = (id: string) => {
    const storedExams = JSON.parse(localStorage.getItem("exams") || "[]")
    const updatedExams = storedExams.filter((exam: Exam) => exam.id !== id)
    localStorage.setItem("exams", JSON.stringify(updatedExams))
  }
  useEffect(() => {
    try {
      const storedExams = JSON.parse(localStorage.getItem("exams") || "[]")
      if (Array.isArray(storedExams)) {
        setExams(storedExams)
      } else {
        console.warn("Invalid exams data in localStorage. Resetting to an empty array.")
        setExams([])
      }
    } catch (error) {
      console.error("Failed to parse exams from localStorage:", error)
      setExams([])
    }
  }, [])
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h1 className="text-2xl font-semibold">Tests</h1>
        <AddTestForm />
      </div>
      <div className="grid grid-cols-1 gap-4 m-4 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <div key={exam.id} className="px-2 py-2 border rounded-xl dark:bg-zinc-900 dark:border-zinc-600">
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
              <div className="flex items-center justify-between">
                <p className="p-1 text-xs font-medium bg-white rounded-xl dark:text-black">
                  {exam.date ? new Date(exam.date).toLocaleDateString() : "No Date"}
                </p>
                <div className="flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className="p-1 text-xs font-medium bg-white cursor-pointer rounded-xl dark:text-black"
                          onClick={() => deleteTest(exam.id)}
                        >
                          <Trash size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="dark:text-white dark:bg-black dark:border-zinc-600">
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xs font-medium">Class {exam.userClass}</h2>
              </div>
              <h2 className="text-2xl font-bold">{exam.name}</h2>
              <div className="flex items-center justify-between mt-6">
                <h2 className="text-xs font-semibold">{exam.attempts}Attempts</h2>
                <h2 className="text-xs font-semibold">{exam.questions.length} Question</h2>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <div className="flex items-center gap-1 font-semibold text-md ">
                  <Timer size={20} color="red" /> <span className="text-black dark:text-white">{exam.duration}</span>
                </div>
              </div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="dark:bg-white">Preview</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-none dark:bg-zinc-900 ">
                    <AlertDialogHeader className="rounded-md ">
                      <div className="flex items-center justify-between p-2 border-b-2 dark:border-zinc-600">
                        <AlertDialogTitle className="text-2xl">Exam Preview</AlertDialogTitle>
                        <div className="flex justify-end">
                          <AlertDialogAction className="dark:bg-zinc-800 dark:border-zinc-800 dark:text-white lg:mt-2">
                            X
                          </AlertDialogAction>
                        </div>
                      </div>
                      <AlertDialogDescription className="overflow-auto max-h-96">
                        <Card className="max-w-2xl mx-auto overflow-hidden text-black rounded-lg shadow-md dark:bg-zinc-900 dark:text-zinc-400">
                          <CardHeader>
                            <CardTitle className="flex mb-2 dark:text-white">{exam.name}</CardTitle>
                            <CardDescription className="justify-center w-20 py-1 mb-4 text-sm font-semibold text-center text-gray-700 bg-gray-200 rounded-full">
                              class: {exam.userClass}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="grid grid-cols-2 gap-4 font-semibold dark:text-gray-200">
                            <p>
                              <span className="text-gray-400">Date: </span>
                              {exam.date ? new Date(exam.date).toLocaleDateString() : "No Date"}
                            </p>
                            <p>
                              <span className="text-gray-400">Duration: </span>
                              {exam.duration}
                            </p>
                            <p>
                              <span className="text-gray-400">Questions: </span>
                              {exam.questions.length}
                            </p>
                            <p>
                              <span className="text-gray-400">Attempts: </span>
                              {exam.attempts}
                            </p>
                          </CardContent>
                          <CardContent>
                            <div className="max-w-2xl p-2 mx-auto overflow-hidden text-black rounded-lg shadow-md dark:bg-zinc-900 dark:text-zinc-400">
                              <h3 className="mb-3 text-xl font-semibold">Questions:</h3>
                              <ul className="space-y-3">
                                {exam.questions.map((question, index) => (
                                  <li
                                    key={question.id}
                                    className="p-3 bg-gray-100 rounded dark:bg-black dark:text-zinc-400"
                                  >
                                    <span className="mr-2 font-medium">{index + 1}.</span>
                                    {question.question}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

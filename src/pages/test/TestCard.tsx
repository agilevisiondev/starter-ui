import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Exam } from "@/interfaces/test"
import { Timer, Trash } from "lucide-react"
import { useEffect, useState } from "react"

function TestCard() {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      {exams.map((exam) => (
        <div key={exam.id} className="border rounded-xl py-2 px-2 dark:bg-zinc-900 dark:border-zinc-600">
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <p className="bg-white rounded-xl p-1 text-xs font-medium dark:text-black">
                {exam.date ? new Date(exam.date).toLocaleDateString() : "No Date"}
              </p>
              <div className="flex">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="cursor-pointer bg-white rounded-xl p-1 text-xs font-medium dark:text-black"
                        onClick={() => deleteTest(exam.id)}
                      >
                        <Trash size={16} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xs font-medium">Class {exam.userClass}</h2>
            </div>
            <div className="">
              <h2 className="text-2xl font-bold">{exam.name}</h2>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div>
                <h2 className="text-xs font-semibold">{exam.attempts}Attempts</h2>
              </div>
              <div>
                <h2 className="text-xs font-semibold">{exam.questions.length} Question</h2>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <div className="text-md font-semibold flex gap-1 items-center ">
                <Timer size={20} color="red" /> <span className="text-black dark:text-white">{exam.duration}</span>
              </div>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="dark:bg-white">Preview</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="dark:bg-zinc-900 border-none ">
                  <AlertDialogHeader className=" rounded-md">
                    <div className="flex justify-between items-center border-b-2 dark:border-zinc-600 p-2">
                      <AlertDialogTitle className="text-2xl">Exam Preview</AlertDialogTitle>
                      <div className="flex justify-end">
                        <AlertDialogAction className="dark:bg-zinc-800 dark:border-zinc-800 dark:text-white lg:mt-2">
                          X
                        </AlertDialogAction>
                      </div>
                    </div>
                    <AlertDialogDescription className="max-h-96 overflow-auto p-2">
                      <div className="max-w-2xl mx-auto shadow-md rounded-lg overflow-hidden dark:bg-zinc-900 text-black dark:text-zinc-400">
                        <div className="p-2">
                          <h2 className="text-2xl font-bold mb-5 dark:text-gray-200">{exam.name}</h2>
                          <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-4">
                            class: {exam.userClass}
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex gap-1 items-center">
                              <p className="text-zinc-400 font-semibold">Date:</p>
                              <p className="font-semibold dark:text-gray-200">
                                {exam.date ? new Date(exam.date).toLocaleDateString() : "No Date"}
                              </p>
                            </div>
                            <div className="flex gap-1 items-center">
                              <p className="text-zinc-400 font-semibold">Duration:</p>
                              <p className="font-semibold dark:text-gray-200">{exam.duration}</p>
                            </div>
                            <div className="flex gap-1 items-center">
                              <p className="text-zinc-400 font-semibold">Questions:</p>
                              <p className="font-semibold dark:text-gray-200">{exam.questions.length}</p>
                            </div>
                            <div className="flex gap-1 items-center">
                              <p className="text-zinc-400 font-semibold">Attempts:</p>
                              <p className="font-semibold dark:text-gray-200">{exam.attempts}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold mb-3">Questions:</h3>
                            <ul className="space-y-3">
                              {exam.questions.map((question, index) => (
                                <li
                                  key={question.id}
                                  className="bg-gray-100 dark:bg-black dark:text-zinc-400 p-3 rounded"
                                >
                                  <span className="font-medium mr-2">{index + 1}.</span>
                                  {question.question}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TestCard

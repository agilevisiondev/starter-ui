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
import { Exam } from "@/interfaces/test"
import { useEffect, useState } from "react"

function Preview() {
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
  const [exams, setExams] = useState<Exam[]>([])
  return (
    <div>
      {exams.map((exam) => (
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
                          <li key={question.id} className="bg-gray-100 dark:bg-black dark:text-zinc-400 p-3 rounded">
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
      ))}
    </div>
  )
}

export default Preview

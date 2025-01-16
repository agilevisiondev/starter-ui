import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CirclePlus, CircleCheck } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Question } from "./types"
import { questions } from "./Question"
import { Exam } from "./types"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function QuestionBank() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [instructionOpen, setInstructionOpen] = useState(true)
  const [currentExam, setCurrentExam] = useState<Exam | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const examData = localStorage.getItem("currentExam")
    if (examData) {
      const parsedExam = JSON.parse(examData)
      setCurrentExam(parsedExam)
      setSelectedQuestions(parsedExam.questions || [])
    } else {
      navigate("/test")
    }
  }, [navigate])

  const handleInstruction = () => {
    setInstructionOpen(!instructionOpen)
  }
  const handleAdd = (question: Question) => {
    setSelectedQuestions((prev) => {
      const isSelected = prev.some((q) => q.id === question.id)
      if (isSelected) {
        return prev.filter((q) => q.id !== question.id)
      } else {
        return [...prev, question]
      }
    })
  }

  const handleSubmit = () => {
    if (currentExam) {
      const updatedExam = { ...currentExam, questions: selectedQuestions }
      const storedExams: Exam[] = JSON.parse(localStorage.getItem("exams") || "[]")
      const updatedExams = storedExams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam))
      if (!storedExams.some((exam) => exam.id === updatedExam.id)) {
        updatedExams.push(updatedExam)
      }
      localStorage.setItem("exams", JSON.stringify(updatedExams))
      localStorage.removeItem("currentExam")
      console.log(updatedExam)
      navigate("/test")
    }
  }
  return (
    <div>
      <div className="border dark:bg-black rounded-md border-gray-400 mb-2 mt-2">
        <div
          className="text-xl font-semibold p-4 border-b border-gray-400 bg-slate-100 dark:bg-black"
          onClick={handleInstruction}
        >
          Exam Instruction
        </div>
        {instructionOpen && currentExam && (
          <div className="">
            <div className="flex border-b dark:border-zinc-600 dark:bg-zinc-800nu2 justify-between px-4">
              <div className="text-lg font-medium  px-4 mt-4 pb-2">{currentExam.name}</div>
              {/* <div className="text-lg font-medium px-4 mt-4 pb-2 hover:opacity-65 hover:cursor-pointer">
                <Pencil />
              </div> */}
            </div>

            <div className="lg:flex lg:flex-row justify-around p-2">
              <div className="font-medium py-2 lg:px-5 flex gap-1">
                <p className="text-gray-400">Attempts: </p>
                <span className="font-bold">{currentExam.attempts}</span>
              </div>
              <div className=" font-medium py-2  flex gap-1 lg:border-r dark:border-zinc-600 lg:border-l lg:px-32">
                <p className="text-gray-400">Duration: </p>
                <span className="font-bold">{currentExam.duration}</span>
              </div>
              <div className=" font-medium dark:border-zinc-600 py-2 lg:px-5 flex gap-1 ">
                <p className="text-gray-400">Class: </p> <span className="font-bold">{currentExam.userClass}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button className="w-28 mb-2 mr-2" onClick={handleSubmit} disabled={selectedQuestions.length < 1}>
          Submit
        </Button>
      </div>
      <ScrollArea className="lg:w-full w-96 whitespace-nowrap rounded-md border">
        <div className="dark:bg-black">
          <div className="border rounded-md border-gray-400">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">Add Question's</p>
                <p className="text-sm font-semibold px-8">Selected: {selectedQuestions.length}</p>
              </div>

              <p className="font-medium text-gray-500 dark:text-gray-400">Here's a list of your Questions!</p>
            </div>
            <div className="flex flex-row">
              <div className="px-4 py-2 w-1/3">
                <Input id="topic" placeholder="Search Topics . . ." className="dark:border-zinc-600 mt-2" />
              </div>
              <div className="mt-4">
                <Button className="dark:bg-white">
                  <CirclePlus />
                  Filter
                </Button>
              </div>
            </div>
            <div className="border rounded-md border-gray-400 dark:bg-black mx-4 my-4 ">
              <div className="flex text-center px-4 py-2 text-md font-semibold bg-slate-100 dark:bg-black">
                <div>Type</div>
                <div className="ml-10">Question</div>
                <div className="ml-72">
                  <p className="ml-60 w-20">Difficulty</p>
                </div>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-200 border-b">
                {questions.map((question) => (
                  <div key={question.id} className="flex px-4 py-2 text-sm border-b last:border-b-0 border-gray-300">
                    <div className="w-8">{question.type}</div>
                    <div className="ml-10 w-96">
                      {question.question.split(" ").slice(0, 6).join(" ")} <span>. . .</span>
                    </div>
                    <div
                      className={`ml-56 w-16 text-center text-sm font-semibold ${
                        question.difficulty === "hard"
                          ? "text-red-600 bg-red-100 rounded-md border border-red-400"
                          : question.difficulty === "medium"
                          ? "text-yellow-600 bg-yellow-100 rounded-md border border-yellow-400"
                          : "text-green-600 bg-green-100 rounded-md border border-green-400"
                      } `}
                    >
                      {question.difficulty}
                    </div>
                    <div className="ml-48 w-20 text-center  hover:cursor-pointer" onClick={() => handleAdd(question)}>
                      {selectedQuestions.some((q) => q.id === question.id) ? (
                        <CircleCheck className="text-green-500" />
                      ) : (
                        <CirclePlus />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    <PaginationLink href="#">2</PaginationLink>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default QuestionBank

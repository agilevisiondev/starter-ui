import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Question } from "@/interfaces/test"
import { questions } from "@/lib/constants"
import { Exam } from "@/interfaces/test"
import QuestionInstruction from "./old/OldQuestionInstruction"
import AddQuestion from "./AddQuestion"

function QuestionBank() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [currentExam, setCurrentExam] = useState<Exam | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const examData = localStorage.getItem("currentExam")
    if (examData) {
      const parsedExam = JSON.parse(examData)
      setCurrentExam(parsedExam)
      setSelectedQuestions(parsedExam.questions || [])
    } else {
      // navigate("/test")
    }
  }, [])

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
      // navigate("/test")
    }
  }
  return (
    <div>
      <div>{/* <QuestionInstruction /> */}</div>
      <div className="flex justify-end">
        <Button className="mb-2 mr-2 w-28" onClick={handleSubmit} disabled={selectedQuestions.length < 1}>
          Submit
        </Button>
      </div>
      <div>
        <ScrollArea className="border rounded-md lg:w-full w-96 whitespace-nowrap">
          <AddQuestion selectedQuestions={selectedQuestions} questions={questions} onClick={handleAdd} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

export default QuestionBank

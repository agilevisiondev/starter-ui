import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Question } from "@/interfaces/test"
import { Exam } from "@/interfaces/test"
function QuestionInstruction() {
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
  return (
    <div>
      <div className="border dark:bg-black rounded-md border-gray-400 mb-2 mt-2">
        <div
          className="text-xl font-semibold p-4 border-b border-gray-400 bg-slate-100 dark:bg-zinc-900"
          onClick={handleInstruction}
        >
          Exam Instruction
        </div>
        {instructionOpen && currentExam && (
          <div className="">
            <div className="flex border-b dark:border-zinc-600 dark:bg-zinc-800nu2 justify-between px-4">
              <div className="text-lg font-medium  px-4 mt-4 pb-2">{currentExam.name}</div>
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
    </div>
  )
}

export default QuestionInstruction

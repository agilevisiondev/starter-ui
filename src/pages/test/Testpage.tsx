import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { questions } from "@/lib/constants"
import DashboardPage from "@/layouts/DashboardPage"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Box, Timer } from "lucide-react"
export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const currentQuestion = questions[currentQuestionIndex]
  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
  }
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }
  const handleNavigate = (index: number) => {
    setCurrentQuestionIndex(index)
  }
  const handleSubmit = () => {
    localStorage.setItem("answers", JSON.stringify(answers))
    console.log("Exam submitted:", answers)
  }
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "MCQ":
        return (
          <RadioGroup value={answers[currentQuestion.id] || ""} onValueChange={handleAnswer} className="space-y-2">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "T/F":
        return (
          <RadioGroup value={answers[currentQuestion.id] || ""} onValueChange={handleAnswer} className="space-y-2">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "Long":
        return (
          <Textarea
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Type your detailed answer here"
            className="mt-2"
          />
        )
      default:
        return null
    }
  }
  return (
    <DashboardPage className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <Card className="flex flex-col justify-between lg:flex-row p-4">
          <div className="w-full flex flex-col justify-between items-start lg:items-center lg:flex-row lg:w-auto">
            <p className="text-md font-medium">
              <div className="text-lg font-semibold">Computer Organisation and Architecture</div>
              <div className="flex items-center text-sm gap-1 mt-2">
                <div className="text-red-500">
                  <Timer size={20} />
                </div>
                <span>00:04:56</span>
              </div>
            </p>
          </div>
          <Button className="mt-4 lg:mt-0 lg:w-auto" onClick={handleSubmit}>
            Review and Submit
          </Button>
        </Card>
        <div className="flex mt-4 space-x-4">
          <Card className="flex flex-col w-full min-h-96 p-4 lg:w-3/4">
            <div className="flex-grow">
              <CardHeader>
                <div className="flex justify-between ">
                  <CardDescription className="text-base font-semibold dark:text-gray-100">
                    Question {currentQuestionIndex + 1}
                  </CardDescription>
                  <CardDescription className="p-1 text-sm font-semibold rounded-md bg-slate-200 dark:bg-slate-950 dark:text-gray-100">
                    {"ARITHMETIC"}
                  </CardDescription>
                </div>
              </CardHeader>
              <div>
                <p className="mb-4 px-6">{currentQuestion.question}</p>
                <div className="px-8 py-3">{renderQuestion()}</div>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              {currentQuestionIndex === questions.length - 1 ? (
                <Button onClick={handleSubmit}>Submit Exam</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </CardFooter>
          </Card>
          <Card className="w-1/4 p-4 hidden lg:block">
            <div className="flex justify-center gap-2 mb-4">
              <h3 className="font-semibold">Question Navigator</h3>
              <Box />
            </div>
            <div className="overflow-y-auto h-96 bg-slate-100 dark:bg-gray-950 rounded-md p-4">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`text-sm font-semibold py-2 text-center rounded-md ${
                      currentQuestionIndex === index
                        ? "border border-blue-500"
                        : answers[questions[index].id]
                        ? "border border-green-500 bg-green-50 dark:text-black"
                        : currentQuestionIndex > index
                        ? "border border-orange-500 bg-orange-50 dark:text-black"
                        : "bg-white dark:bg-slate-900"
                    } hover:bg-slate-200 dark:hover:bg-gray-800`}
                    onClick={() => handleNavigate(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardPage>
  )
}

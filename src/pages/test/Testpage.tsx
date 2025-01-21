import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { questions } from "@/lib/constants"
import DashboardPage from "@/layouts/DashboardPage"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Box, Timer } from "lucide-react"
export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[] | undefined>>({})
  const currentQuestion = questions[currentQuestionIndex]
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

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
          <RadioGroup
            value={typeof answers[currentQuestion.id] === "string" ? (answers[currentQuestion.id] as string) : ""}
            onValueChange={handleAnswer}
            className="space-y-2"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} />
                <Label>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "MCQ-MS":
        return (
          <div className="space-y-2">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={index.toString()}
                  value={option}
                  checked={answers[currentQuestion.id]?.includes(option) || false}
                  onChange={(e) => {
                    const newAnswers = answers[currentQuestion.id] || []
                    if (e.target.checked) {
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: [...newAnswers, option],
                      }))
                    } else {
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: Array.isArray(newAnswers)
                          ? newAnswers.filter((ans) => ans !== option)
                          : [],
                      }))
                    }
                  }}
                />
                <Label htmlFor={index.toString()}>{option}</Label>
              </div>
            ))}
          </div>
        )
      case "T/F":
        return (
          <RadioGroup
            value={typeof answers[currentQuestion.id] === "string" ? (answers[currentQuestion.id] as string) : ""}
            onValueChange={handleAnswer}
            className="space-y-2"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} />
                <Label>{option}</Label>
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
    <DashboardPage className="flex-1 flex flex-col h-screen">
      <Card className="flex flex-col justify-between lg:flex-row p-4">
        <div className="text-md w-full items-start font-medium lg:items-center lg:flex-row lg:w-auto">
          <div className="text-lg font-semibold">Computer Organisation and Architecture</div>
          <div className="flex items-center text-sm text-gray-500 gap-1 mt-2">
            <Timer size={20} color="red" />
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </div>
        <Button className="mt-4 lg:mt-0 lg:w-auto" onClick={handleSubmit}>
          Review and Submit
        </Button>
      </Card>
      <div className="flex mt-4 space-x-4">
        <Card className="flex flex-col w-full min-h-96 p-4 lg:w-3/4">
          <div className="flex-grow">
            <CardHeader>
              <div className="flex justify-between">
                <CardDescription className="text-base font-semibold dark:text-gray-100">
                  Question {currentQuestionIndex + 1}
                </CardDescription>
                <div className="flex gap-2">
                  <CardDescription className="p-1 text-xs font-semibold rounded-md bg-slate-200 dark:bg-zinc-700 dark:text-gray-100">
                    {currentQuestion.type}
                  </CardDescription>
                  <CardDescription className="p-1 text-xs font-semibold rounded-md bg-emerald-200 dark:bg-zinc-700 dark:text-gray-100">
                    {"ARITHMATIC"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 px-6">{currentQuestion.question}</p>
              <div className="px-8 py-3">{renderQuestion()}</div>
            </CardContent>
          </div>
          <CardFooter className="flex justify-between mt-6 bg-white fixed bottom-0 left-0 right-0 p-5 lg:left-16 lg:right-10 dark:bg-slate-950">
            <Button onClick={handlePrevious} className={`${currentQuestionIndex === 0 ? "opacity-0" : ""}`}>
              Previous
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit}>Submit Exam</Button>
            ) : (
              <Button onClick={handleNext}>Submit</Button>
            )}
          </CardFooter>
        </Card>
        <Card className="w-1/4 p-4 hidden lg:block">
          <div className="flex justify-center gap-2 mb-4">
            <h3 className="font-semibold">Question Navigator</h3>
            <Box />
          </div>
          <div className="overflow-y-auto h-96 grid grid-cols-5 gap-2 max-h-max bg-slate-100 dark:bg-gray-950 rounded-md p-4">
            {questions.map((_, index) => (
              <Button
                key={index}
                className={`text-sm text-black font-semibold py-2 text-center bg-white rounded-md ${
                  currentQuestionIndex === index
                    ? "border border-blue-500"
                    : answers[questions[index].id]
                    ? "border border-green-500 bg-green-50 dark:text-black "
                    : "bg-white dark:bg-slate-900"
                } hover:bg-slate-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800`}
                onClick={() => handleNavigate(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </DashboardPage>
  )
}

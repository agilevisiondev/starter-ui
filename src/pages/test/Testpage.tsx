import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { questions } from "@/lib/constants"
import DashboardPage from "@/layouts/DashboardPage"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Box, Timer } from "lucide-react"
import clsx from "clsx"
import { Badge } from "@/components/ui/badge"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
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

  const handleAnswer = (answer: string | string[]) => {
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
      {/* Test instruction Card */}
      <Card className="flex flex-col justify-between p-4 lg:items-center lg:flex-row">
        <CardContent>
          <CardTitle className="text-lg">Computer Organisation and Architecture</CardTitle>
          <CardDescription className="flex items-center text-gray-500 gap-1 mt-2">
            <Timer size={20} color="red" />
            <span>{formatTime(elapsedTime)}</span>
          </CardDescription>
        </CardContent>
        <Button onClick={handleSubmit}>Review and Submit</Button>
      </Card>
      <div className="flex mt-4 space-x-4">
        {/* Question Card */}
        <Card className="flex flex-col flex-grow w-full min-h-96 p-2 lg:p-4 md:p-4 lg:w-3/4">
          <CardTitle className="flex justify-between p-5">
            <CardDescription className="font-semibold dark:text-gray-100">
              Question {currentQuestionIndex + 1}
            </CardDescription>
            <CardDescription className="flex gap-2 text-xs font-medium dark:text-gray-100">
              <Badge variant={"outline"}>{currentQuestion.type}</Badge>
              <Badge variant={"secondary"}>ARITHMATIC</Badge>
            </CardDescription>
          </CardTitle>
          <CardContent>
            <h1 className="mb-4 lg:px-4">{currentQuestion.question}</h1>
            <div className="py-3 px-5 lg:px-8">{renderQuestion()}</div>
          </CardContent>
          <CardFooter className="flex justify-between mt-6 bg-white fixed bottom-0 left-0 right-0 p-5 lg:left-16 lg:right-10 dark:bg-slate-950">
            <Button onClick={handlePrevious} className={`${currentQuestionIndex === 0 ? "opacity-0" : ""}`}>
              Previous
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit}>Submit Exam</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </CardFooter>
        </Card>
        {/* Question navigation Card */}
        <Card className="w-1/4 p-4 hidden lg:block">
          <CardFooter className="flex justify-center font-semibold gap-1">
            Question Navigator
            <Box />
          </CardFooter>
          <CardContent className="grid grid-cols-4 max-h-max overflow-y-auto p-4 gap-2 rounded-md bg-slate-200 dark:bg-gray-950">
            {questions.map((question) => (
              <Button
                variant={"navigationButton"}
                size={"xs"}
                key={question.id}
                className={clsx({
                  "border border-blue-500": currentQuestionIndex === questions.findIndex((q) => q.id === question.id),
                  "border border-green-500": answers[question.id],
                })}
                onClick={() => handleNavigate(questions.findIndex((q) => q.id === question.id))}
              >
                {questions.findIndex((q) => q.id === question.id) + 1}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardPage>
  )
}

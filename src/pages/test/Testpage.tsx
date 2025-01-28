import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { questions } from "@/lib/constants"
import DashboardPage from "@/layouts/DashboardPage"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Timer, Flag } from "lucide-react"
import clsx from "clsx"
import { Badge } from "@/components/ui/badge"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import QuestionNavigator from "./QuestionNavigator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom"

const MultipleChoiceMCQAnswerSchema = (question: any) => {
  if (question.type === "MCQ-MS") {
    return z.array(z.string()).min(1)
  }
  return z.string()
}

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[] | undefined>>({})
  const currentQuestion = questions[currentQuestionIndex]
  const [elapsedTime, setElapsedTime] = useState(10)
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({})
  const [timeComplete, setTimeComplete] = useState(false)
  const navigate = useNavigate()

  const QuestionformSchema = z.object({
    [`${currentQuestion?.id}`]: MultipleChoiceMCQAnswerSchema(currentQuestion),
  })

  const form = useForm({
    resolver: zodResolver(QuestionformSchema),
    defaultValues: {
      [`${currentQuestion?.id}`]: currentQuestion?.type === "MCQ-MS" ? [] : "",
    },
  })

  useEffect(() => {
    form.reset({
      [`${currentQuestion?.id}`]: answers[currentQuestion?.id] || (currentQuestion?.type === "MCQ-MS" ? [] : ""),
    } as any)
  }, [currentQuestionIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      if (elapsedTime > 0) {
        setElapsedTime((prev) => prev - 1)
        console.log("Time remaining:", elapsedTime)
        return
      } else {
        setTimeComplete(true)
        console.log("Time complete:", timeComplete)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [elapsedTime, timeComplete])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleNavigate = (index: number) => {
    setCurrentQuestionIndex(index)
    setVisitedQuestions((prev) => ({ ...prev, [questions[index].id]: true }))
  }

  const handleNext = (index: number) => {
    setVisitedQuestions((prev) => ({ ...prev, [questions[index].id]: true }))
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  useEffect(() => {
    if (timeComplete === true) {
      localStorage.setItem("answers", JSON.stringify(answers))
      console.log("Exam submitted:", answers)
      alert("Time has been over, Exam submitted successfully")
      navigate("/reports")
    }
  })

  const handleAnswer = () => {
    localStorage.setItem("answers", JSON.stringify(answers))
    console.log("Exam submitted:", answers)
    alert("Are You Sure You Want To Submit The Exam?")
    navigate("/reports")
  }

  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  const clearAnswer = (questionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: undefined,
    }))
    form.resetField(`${questionId}`)
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "MCQ":
        return (
          <RadioGroup
            value={typeof answers[currentQuestion.id] === "string" ? (answers[currentQuestion.id] as string) : ""}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))}
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
          <AdvancedFormField
            form={form}
            type="checkbox"
            name={`${currentQuestion.id}`}
            label={currentQuestion.question}
            options={currentQuestion.options}
            onChange={(value: string[]) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))}
          />
        )
      case "T/F":
        return (
          <RadioGroup
            value={typeof answers[currentQuestion.id] === "string" ? (answers[currentQuestion.id] as string) : ""}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))}
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
            onChange={(e) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))}
            placeholder="Type your detailed answer here"
            className="mt-2"
          />
        )
      default:
        return null
    }
  }

  return (
    <DashboardPage className="flex-1">
      <Card className="flex flex-col justify-between w-full p-4 lg:items-center lg:flex-row">
        <CardContent>
          <CardTitle className="text-lg">Computer Organization and Architecture</CardTitle>
          <CardDescription className="flex items-center gap-1 mt-2 text-gray-500">
            <Timer size={20} color="red" />
            <span>{formatTime(elapsedTime)}</span>
          </CardDescription>
        </CardContent>
        <Button onClick={handleAnswer}>Review and Submit</Button>
      </Card>
      <div className="flex w-full mt-4 mb-16 space-x-4">
        <Card className="flex flex-col flex-grow w-full min-h-96 lg:p-4 md:p-4 lg:w-3/4">
          <CardTitle className="flex justify-between p-5">
            <CardDescription className="font-semibold dark:text-gray-100">
              Question {currentQuestionIndex + 1}
            </CardDescription>
            <CardDescription className="flex gap-2 text-xs font-medium dark:text-gray-100">
              <Badge variant={"outline"}>{currentQuestion.type}</Badge>
              <Badge variant={"secondary"}>ARITHMETIC</Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant={"secondary"}
                      onClick={() => toggleFlag(currentQuestion.id)}
                      className={clsx("cursor-pointer", {
                        "text-red-500": flaggedQuestions[currentQuestion.id],
                        "text-black dark:text-white": !flaggedQuestions[currentQuestion.id],
                      })}
                    >
                      <Flag size={16} />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs font-normal">Mark for review</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardDescription>
          </CardTitle>
          <div className="p-4">
            <h1 className="mb-4 lg:px-4">{currentQuestion.question}</h1>
            <Form {...form}>
              <form className="px-1 py-3 md:px-4 lg:px-8">{renderQuestion()}</form>
            </Form>
            {answers[currentQuestion.id] !== undefined && answers[currentQuestion.id]?.length !== 0 && (
              <div
                onClick={() => clearAnswer(currentQuestion.id)}
                className="pl-5 mt-5 ml-2 text-sm underline cursor-pointer"
              >
                Clear Answer
              </div>
            )}
          </div>
        </Card>
        <QuestionNavigator
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          visitedQuestions={visitedQuestions}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          handleNavigate={handleNavigate}
          className="hidden w-1/4 p-4 lg:block"
        />
      </div>
      <div className="fixed bottom-0 grid grid-cols-3 p-4 bg-white dark:bg-slate-950">
        <div className="sticky left-0">
          <Button onClick={handlePrevious} className={`-ml-2 ${currentQuestionIndex === 0 ? "hidden" : "block"}`}>
            Previous
          </Button>
        </div>
        <div className="flex justify-end w-full min-w-125"></div>
        <div className="flex mr-6 justify-self-end">
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={() => handleNext(questions.findIndex((q) => q.id === currentQuestion.id))}>Next</Button>
          ) : (
            <Button onClick={handleAnswer}>Submit</Button>
          )}
        </div>
      </div>
    </DashboardPage>
  )
}

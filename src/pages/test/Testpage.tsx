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
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { Box, Timer, Flag } from "lucide-react"
import clsx from "clsx"
import { Badge } from "@/components/ui/badge"
import AdvancedFormField from "@/components/elements/AdvancedFormField"

const McAnswerSchema = (question: any) => {
  if (question.type === "MCQ-MS") {
    return z.array(z.string()).min(1)
  }
  return z.string()
}

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[] | undefined>>({})
  const currentQuestion = questions[currentQuestionIndex]
  const [elapsedTime, setElapsedTime] = useState(0)
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({})

  const formSchema = z.object({
    [`${currentQuestion?.id}`]: McAnswerSchema(currentQuestion),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
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
      setElapsedTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
  const handleAnswer = () => {
    localStorage.setItem("answers", JSON.stringify(answers))
    console.log("Exam submitted:", answers)
  }
  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
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
    <DashboardPage>
      <Card className="flex flex-col justify-between p-4 lg:items-center lg:flex-row">
        <CardContent>
          <CardTitle className="text-lg">Computer Organisation and Architecture</CardTitle>
          <CardDescription className="flex items-center text-gray-500 gap-1 mt-2">
            <Timer size={20} color="red" />
            <span>{formatTime(elapsedTime)}</span>
          </CardDescription>
        </CardContent>
        <Button onClick={handleAnswer}>Review and Submit</Button>
      </Card>
      <div className="flex mt-4 mb-4 space-x-4">
        <Card className="flex flex-col flex-grow w-full min-h-96 p-2 lg:p-4 md:p-4 lg:w-3/4">
          <CardTitle className="flex justify-between p-5">
            <CardDescription className="font-semibold dark:text-gray-100">
              Question {currentQuestionIndex + 1}
            </CardDescription>
            <CardDescription className="flex gap-2 text-xs font-medium dark:text-gray-100">
              <Badge variant={"outline"}>{currentQuestion.type}</Badge>
              <Badge variant={"secondary"}>ARITHMATIC</Badge>
              <Badge
                variant={"secondary"}
                onClick={() => toggleFlag(currentQuestion.id)}
                className={clsx({
                  "text-red-500": flaggedQuestions[currentQuestion.id],
                  "text-black": !flaggedQuestions[currentQuestion.id],
                })}
              >
                <Flag size={16} />
              </Badge>
            </CardDescription>
          </CardTitle>
          <CardContent>
            <h1 className="mb-4 lg:px-4">{currentQuestion.question}</h1>
            <Form {...form}>
              <form className="py-3 px-1 md:px-4 lg:px-8">{renderQuestion()}</form>
            </Form>
          </CardContent>
        </Card>
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
                  "border border-green-500 bg-green-100": answers[question.id],
                  "border border-orange-500 bg-orange-100": visitedQuestions[question.id] && !answers[question.id],
                })}
                onClick={() => handleNavigate(questions.findIndex((q) => q.id === question.id))}
              >
                {questions.findIndex((q) => q.id === question.id) + 1}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 fixed bottom-0 p-4 bg-white dark:bg-slate-950">
        <div className="sticky left-0">
          <Button onClick={handlePrevious} className={`-ml-2 ${currentQuestionIndex === 0 ? "hidden" : "block"}`}>
            Previous
          </Button>
        </div>
        <div className="min-w-125 flex w-full justify-end"></div>
        <div className="flex justify-self-end mr-6">
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

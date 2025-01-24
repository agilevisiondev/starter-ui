import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Box } from "lucide-react"
import clsx from "clsx"
import { Question } from "@/interfaces/test"

interface QuestionNavigatorProps {
  questions: Question[]
  currentQuestionIndex: number
  visitedQuestions: Record<number, boolean>
  answers: Record<number, string | string[] | undefined>
  flaggedQuestions: Record<number, boolean>
  handleNavigate: (index: number) => void
  className?: string
}

const QuestionNavigator = ({
  questions,
  currentQuestionIndex,
  visitedQuestions,
  answers,
  flaggedQuestions,
  handleNavigate,
  className,
}: QuestionNavigatorProps) => {
  
  return (
    <Card className={className}>
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
              "bg-orange-300 dark:bg-orange-300 dark:text-black":
                visitedQuestions[question.id] && !answers[question.id],
              "bg-blue-300 dark:bg-blue-300  dark:text-black":
                currentQuestionIndex === questions.findIndex((q) => q.id === question.id),
              "bg-green-300 dark:bg-green-300  dark:text-black": answers[question.id],
              "bg-red-300 dark:bg-red-300  dark:text-black": flaggedQuestions[question.id],
            })}
            onClick={() => handleNavigate(questions.findIndex((q) => q.id === question.id))}
          >
            {questions.findIndex((q) => q.id === question.id) + 1}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

export default QuestionNavigator

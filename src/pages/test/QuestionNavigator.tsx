import { Card } from "@/components/ui/card"
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
      <div className="flex justify-center gap-1 font-semibold">
        Question Navigator
        <Box />
      </div>
      <div className="grid grid-cols-4 gap-2 p-4 mt-2 overflow-y-auto rounded-md max-h-max bg-slate-200 dark:bg-gray-950">
        {questions.map((question) => (
          <Button
            variant={"navigation"}
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
      </div>
    </Card>
  )
}

export default QuestionNavigator

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleCheck, CirclePlus } from "lucide-react"
import { AddQuestionProps } from "@/interfaces/test"

const AddQuestion = ({ selectedQuestions, questions, onClick }: AddQuestionProps) => {
  return (
    <div className="dark:bg-zinc-900">
      <div className="border border-gray-400 rounded-md">
        <div className="flex items-center justify-between px-6 pt-6">
          <p className="text-2xl font-semibold">Add Question's</p>
          <p className="px-8 text-sm font-semibold">Selected: {selectedQuestions.length}</p>
        </div>
        <p className="px-6 pb-6 font-medium text-gray-500 dark:text-gray-400">Here's a list of your Questions!</p>
        <div className="flex flex-row">
          <div className="w-1/3 px-4 py-2">
            <Input id="topic" placeholder="Search Topics . . ." className="mt-2 dark:border-zinc-600" />
          </div>
          <Button className="mt-4 dark:bg-white">
            <CirclePlus />
            Filter
          </Button>
        </div>
        <div className="mx-4 my-4 border border-gray-400 rounded-md dark:bg-black ">
          <div className="flex px-4 py-2 font-semibold text-center text-md bg-slate-100 dark:bg-black">
            <div>Type</div>
            <div className="ml-10">Question</div>
            <div className="ml-72">
              <p className="w-20 ml-60">Difficulty</p>
            </div>
          </div>
          <div className="border-t border-b border-gray-300 dark:border-gray-200">
            {questions.map((question) => (
              <div key={question.id} className="flex px-4 py-2 text-sm border-b border-gray-300 last:border-b-0">
                <div className="w-8">{question.type}</div>
                <div className="ml-10 w-96">
                  {question.question.split("am  ").slice(0, 6).join(" ")} <span>. . .</span>
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
                <div className="w-20 ml-48 text-center hover:cursor-pointer" onClick={() => onClick(question)}>
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
      </div>
    </div>
  )
}

export default AddQuestion

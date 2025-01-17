import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CircleCheck, CirclePlus } from "lucide-react"
import { AddQuestionProps } from "@/interfaces/test"
const AddQuestion = ({ selectedQuestions, questions, onClick }: AddQuestionProps) => {
  return (
    <div className="dark:bg-zinc-900">
      <div className="border rounded-md border-gray-400">
        <div className="flex items-center justify-between px-6 pt-6">
          <p className="text-2xl font-semibold">Add Question's</p>
          <p className="text-sm font-semibold px-8">Selected: {selectedQuestions.length}</p>
        </div>
        <p className="font-medium text-gray-500 dark:text-gray-400 px-6 pb-6">Here's a list of your Questions!</p>

        <div className="flex flex-row">
          <div className="px-4 py-2 w-1/3">
            <Input id="topic" placeholder="Search Topics . . ." className="dark:border-zinc-600 mt-2" />
          </div>
          <Button className="dark:bg-white mt-4">
            <CirclePlus />
            Filter
          </Button>
        </div>
        <div className="border rounded-md border-gray-400 dark:bg-black mx-4 my-4 ">
          <div className="flex text-center px-4 py-2 text-md font-semibold bg-slate-100 dark:bg-black">
            <div>Type</div>
            <div className="ml-10">Question</div>
            <div className="ml-72">
              <p className="ml-60 w-20">Difficulty</p>
            </div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-200 border-b">
            {questions.map((question) => (
              <div key={question.id} className="flex px-4 py-2 text-sm border-b last:border-b-0 border-gray-300">
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
                <div className="ml-48 w-20 text-center hover:cursor-pointer" onClick={() => onClick(question)}>
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

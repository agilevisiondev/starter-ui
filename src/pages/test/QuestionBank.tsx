import InputField from "@/components/elements/SimpleFormField";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import DashboardPage from "@/layouts/DashboardPage";

function QuestionBank() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [instructionOpen, setInstructionOpen] = useState(true);
  const handleInstruction = () => {
    setInstructionOpen(!instructionOpen);
  };
  const handleAdd = (id: number) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((questionId) => questionId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };
  const questions = [
    { id: 1, question: "What is the capital of France?", difficulty: "easy", type: "MCQ" },
    {
      id: 2,
      question: "Explain the concept of polymorphism in Object-Oriented Programming.",
      difficulty: "hard",
      type: "Long",
    },
    { id: 3, question: "True or False: HTML is a programming language.", difficulty: "easy", type: "T/F" },
    { id: 4, question: "Which data structure is used in a BFS algorithm?", difficulty: "medium", type: "MCQ" },
    { id: 5, question: "Write a detailed explanation of the TCP/IP model.", difficulty: "hard", type: "Long" },
    { id: 6, question: "True or False: React is a backend framework.", difficulty: "easy", type: "T/F" },
    { id: 7, question: "What is the output of 2+2 in JavaScript?", difficulty: "easy", type: "MCQ" },
    { id: 8, question: "Discuss the difference between REST and GraphQL APIs.", difficulty: "medium", type: "Long" },
    { id: 9, question: "True or False: Arrays in Java can be resized dynamically.", difficulty: "medium", type: "T/F" },
    { id: 10, question: "What is the time complexity of binary search?", difficulty: "easy", type: "MCQ" },
    {
      id: 11,
      question: "Implement a linked list from scratch in your preferred programming language.",
      difficulty: "hard",
      type: "Long",
    },
    { id: 12, question: "True or False: CSS stands for Cascading Style Sheets.", difficulty: "easy", type: "T/F" },
    {
      id: 13,
      question: "What is the purpose of the Redux store in state management?",
      difficulty: "medium",
      type: "MCQ",
    },
    {
      id: 14,
      question: "Write a comprehensive note on garbage collection in Java.",
      difficulty: "medium",
      type: "Long",
    },
    {
      id: 15,
      question: "True or False: An abstract class in JavaScript can have instance properties.",
      difficulty: "hard",
      type: "T/F",
    },
    { id: 16, question: "What is the primary use of useEffect in React?", difficulty: "medium", type: "MCQ" },
    {
      id: 17,
      question: "Explain the difference between synchronous and asynchronous programming.",
      difficulty: "medium",
      type: "Long",
    },
    {
      id: 18,
      question:
        "True or False: Every JavaScript function returns undefined by default if no return value is specified.",
      difficulty: "medium",
      type: "T/F",
    },
    { id: 19, question: "What is the default port used by HTTP?", difficulty: "easy", type: "MCQ" },
    {
      id: 20,
      question: "Describe the differences between block-level and inline-level elements in HTML.",
      difficulty: "medium",
      type: "Long",
    },
  ];

  return (
    <DashboardPage>
      <div className="border dark:bg-black rounded-md border-gray-400 mb-2">
        <div
          className="text-xl font-semibold p-4 border-b border-gray-400 bg-slate-100 dark:bg-black"
          onClick={handleInstruction}
        >
          Exam Instruction
        </div>
        {instructionOpen === true ? (
          <div className="">
            <div className="text-lg font-medium border-b dark:border-zinc-600 px-4 mt-4 pb-2">Math Internal Exam 2</div>
            <div className="flex flex-row justify-around">
              <div className="font-medium py-2 px-5 flex gap-1">
                <p className="text-gray-400">Attempts: </p>
                <span className="font-bold">2</span>
              </div>
              <div className=" font-medium py-2  flex gap-1 border-r dark:border-zinc-600 border-l px-32">
                <p className="text-gray-400">Duration: </p>
                <span className="font-bold">2hr</span>
              </div>
              <div className=" font-medium dark:border-zinc-600 py-2 px-5 flex gap-1 ">
                <p className="text-gray-400">Total Marks: </p> <span className="font-bold">100</span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="dark:bg-black">
        <div className="border rounded-md border-gray-400">
          <div className="p-6">
            <p className="text-2xl font-semibold">Add Question's</p>
            <p className="font-medium text-gray-500 dark:text-gray-400">Here's a list of your Question!</p>
          </div>
          <div className="flex flex-row">
            <div className="px-4 py-2 w-1/4">
              <InputField placeholder="Search Topics . . ." className="dark:border-zinc-600" />
            </div>
            <div className="mt-4">
              <Button className="dark:bg-white">
                <CirclePlus />
                Filter
              </Button>
            </div>
          </div>
          <div className="border rounded-md border-gray-400 dark:bg-black mx-4 my-4">
            <div className="flex text-center px-4 py-2 text-md font-semibold bg-slate-100">
              <div>Type</div>
              <div className="ml-10">Question</div>
              <div className="ml-72">
                <p className="ml-60 w-20">Difficulty</p>
              </div>
              {/* <div className="ml-48">
                <EllipsisVertical />
              </div> */}
            </div>
            <div className="border-t border-gray-300 dark:border-gray-200 border-b">
              {questions.map((question) => (
                <div key={question.id} className="flex px-4 py-2 text-sm border-b last:border-b-0 border-gray-300">
                  <div className="w-8">{question.type}</div>
                  <div className="ml-10 w-96">
                    {question.question.split(" ").slice(0, 6).join(" ")} <span>. . .</span>
                  </div>
                  <div
                    className={`ml-56 w-16 text-center text-md font-extrabold ${
                      question.difficulty === "hard"
                        ? "text-red-600 bg-red-100 rounded-md border border-red-400"
                        : question.difficulty === "medium"
                        ? "text-yellow-600 bg-yellow-100 rounded-md border border-yellow-400"
                        : "text-green-600 bg-green-100 rounded-md border border-green-400"
                    } `}
                  >
                    {question.difficulty}
                  </div>
                  <div className="ml-48 w-20 text-center  hover:cursor-pointer" onClick={() => handleAdd(question.id)}>
                    {selectedQuestions.includes(question.id) ? (
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
    </DashboardPage>
  );
}

export default QuestionBank;

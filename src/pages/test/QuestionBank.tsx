import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CirclePlus, CircleCheck, Pencil } from "lucide-react";

interface Exam {
  id: string;
  name: string;
  userClass: string;
  date: Date;
  duration: string;
  attempts: number;
  questions: number[];
}

interface Question {
  id: number;
  question: string;
  difficulty: string;
  type: string;
  correctAnswer?: string;
  options?: string[];
}

function QuestionBank() {
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [instructionOpen, setInstructionOpen] = useState(true);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const examData = localStorage.getItem("currentExam");
    if (examData) {
      const parsedExam = JSON.parse(examData);
      setCurrentExam(parsedExam);
      setSelectedQuestions(parsedExam.questions || []);
    } else {
      navigate("/test");
    }
  }, [navigate]);

  const handleInstruction = () => {
    setInstructionOpen(!instructionOpen);
  };

  const handleAdd = (id: number) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((questionId) => questionId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = () => {
    if (currentExam) {
      const updatedExam = { ...currentExam, questions: selectedQuestions };
      const storedExams: Exam[] = JSON.parse(localStorage.getItem("exams") || "[]");
      const updatedExams = storedExams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam));
      if (!storedExams.some((exam) => exam.id === updatedExam.id)) {
        updatedExams.push(updatedExam);
      }
      localStorage.setItem("exams", JSON.stringify(updatedExams));
      localStorage.removeItem("currentExam");
      console.log(updatedExam)
      navigate("/test");
    }
  };

  const questions: Question[] = [
    {
      id: 1,
      type: "MCQ",
      difficulty: "easy",
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      type: "T/F",
      difficulty: "easy",
      question: "The Earth is flat.",
      options: ["True", "False"],
      correctAnswer: "False",
    },
    {
      id: 3,
      type: "Long",
      difficulty: "medium",
      question: "Explain the process of photosynthesis.",
    },
    {
      id: 4,
      type: "MCQ",
      difficulty: "hard",
      question: "Which programming language is used for iOS app development?",
      options: ["Swift", "Python", "Java", "C++"],
      correctAnswer: "Swift",
    },
    {
      id: 5,
      type: "T/F",
      difficulty: "medium",
      question: "JavaScript is a statically-typed language.",
      options: ["True", "False"],
      correctAnswer: "False",
    },
    {
      id: 6,
      type: "Long",
      difficulty: "hard",
      question: "Discuss the significance of data structures in programming.",
    },
    {
      id: 7,
      type: "MCQ",
      difficulty: "easy",
      question: "What is the square root of 64?",
      options: ["6", "8", "10", "12"],
      correctAnswer: "8",
    },
    {
      id: 8,
      type: "T/F",
      difficulty: "hard",
      question: "IPv6 addresses are 128 bits long.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: 9,
      type: "Long",
      difficulty: "medium",
      question: "Describe the difference between a class and an object in object-oriented programming.",
    },
    {
      id: 10,
      type: "MCQ",
      difficulty: "medium",
      question: "Which data structure is used in a LIFO manner?",
      options: ["Queue", "Stack", "Heap", "Graph"],
      correctAnswer: "Stack",
    },
    {
      id: 11,
      type: "MCQ",
      difficulty: "hard",
      question: "Which algorithm has the best time complexity for sorting?",
      options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
      correctAnswer: "Merge Sort",
    },
    {
      id: 12,
      type: "T/F",
      difficulty: "easy",
      question: "HTML stands for HyperText Markup Language.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: 13,
      type: "Long",
      difficulty: "hard",
      question: "Explain the concept of Big-O notation with examples.",
    },
    {
      id: 14,
      type: "MCQ",
      difficulty: "medium",
      question: "Which of the following is a JavaScript framework?",
      options: ["React", "Django", "Laravel", "Ruby on Rails"],
      correctAnswer: "React",
    },
    {
      id: 15,
      type: "T/F",
      difficulty: "hard",
      question: "In a relational database, a primary key can have null values.",
      options: ["True", "False"],
      correctAnswer: "False",
    },
    {
      id: 16,
      type: "Long",
      difficulty: "medium",
      question: "Describe how HTTPS ensures secure communication over the internet.",
    },
    {
      id: 17,
      type: "MCQ",
      difficulty: "easy",
      question: "What is 10 + 15?",
      options: ["20", "25", "30", "35"],
      correctAnswer: "25",
    },
    {
      id: 18,
      type: "T/F",
      difficulty: "medium",
      question: "Python is an interpreted language.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: 19,
      type: "Long",
      difficulty: "hard",
      question: "Discuss the importance of DevOps in modern software development.",
    },
    {
      id: 20,
      type: "MCQ",
      difficulty: "hard",
      question: "What is the maximum value of a 32-bit signed integer?",
      options: ["2^31-1", "2^31", "2^32-1", "2^32"],
      correctAnswer: "2^31-1",
    },
    {
      id: 21,
      type: "T/F",
      difficulty: "medium",
      question:
        "The CSS property 'position: relative' positions an element relative to its nearest positioned ancestor.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: 22,
      type: "MCQ",
      difficulty: "medium",
      question: "Which HTTP status code indicates a successful request?",
      options: ["200", "301", "404", "500"],
      correctAnswer: "200",
    },
    {
      id: 23,
      type: "Long",
      difficulty: "medium",
      question: "Describe the lifecycle of a React component.",
    },
    {
      id: 24,
      type: "T/F",
      difficulty: "easy",
      question: "An array index starts at 0 in most programming languages.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: 25,
      type: "MCQ",
      difficulty: "easy",
      question: "Which of the following is a NoSQL database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      correctAnswer: "MongoDB",
    },
    {
      id: 26,
      type: "T/F",
      difficulty: "hard",
      question: "Docker containers are virtual machines.",
      options: ["True", "False"],
      correctAnswer: "False",
    },
    {
      id: 27,
      type: "Long",
      difficulty: "hard",
      question: "Explain how the CAP theorem applies to distributed systems.",
    },
    {
      id: 28,
      type: "MCQ",
      difficulty: "medium",
      question: "Which CSS property is used to change the text color?",
      options: ["color", "font-color", "text-color", "background-color"],
      correctAnswer: "color",
    },
    {
      id: 29,
      type: "T/F",
      difficulty: "medium",
      question: "Git is a distributed version control system.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: 30,
      type: "Long",
      difficulty: "medium",
      question: "What are the advantages and disadvantages of microservices architecture?",
    },
    {
      id: 31,
      type: "MCQ",
      difficulty: "easy",
      question: "What is the value of PI in mathematics?",
      options: ["3.14", "2.71", "1.62", "4.00"],
      correctAnswer: "3.14",
    },
    {
      id: 32,
      type: "T/F",
      difficulty: "hard",
      question: "A binary search tree (BST) is always balanced.",
      options: ["True", "False"],
      correctAnswer: "False",
    },
    {
      id: 33,
      type: "Long",
      difficulty: "hard",
      question: "Explain the differences between synchronous and asynchronous programming with examples.",
    },
    {
      id: 34,
      type: "MCQ",
      difficulty: "medium",
      question: "Which of the following is a frontend framework?",
      options: ["Angular", "Spring Boot", "Express", "Django"],
      correctAnswer: "Angular",
    },
    {
      id: 35,
      type: "T/F",
      difficulty: "easy",
      question: "RAM is volatile memory.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: 50,
      type: "T/F",
      difficulty: "medium",
      question: "Java supports multiple inheritance through interfaces.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
  ];

  return (
    <div>
      <div className="border dark:bg-black rounded-md border-gray-400 mb-2">
        <div
          className="text-xl font-semibold p-4 border-b border-gray-400 bg-slate-100 dark:bg-black"
          onClick={handleInstruction}
        >
          Exam Instruction
        </div>
        {instructionOpen && currentExam && (
          <div className="">
            <div className="flex border-b dark:border-zinc-600 dark:bg-zinc-800nu2 justify-between px-4">
              <div className="text-lg font-medium  px-4 mt-4 pb-2">{currentExam.name}</div>
              <div className="text-lg font-medium px-4 mt-4 pb-2 hover:opacity-65 hover:cursor-pointer">
                <Pencil />
              </div>
            </div>

            <div className="lg:flex lg:flex-row justify-around p-2">
              <div className="font-medium py-2 lg:px-5 flex gap-1">
                <p className="text-gray-400">Attempts: </p>
                <span className="font-bold">{currentExam.attempts}</span>
              </div>
              <div className=" font-medium py-2  flex gap-1 lg:border-r dark:border-zinc-600 lg:border-l lg:px-32">
                <p className="text-gray-400">Duration: </p>
                <span className="font-bold">{currentExam.duration}</span>
              </div>
              <div className=" font-medium dark:border-zinc-600 py-2 lg:px-5 flex gap-1 ">
                <p className="text-gray-400">Class: </p> <span className="font-bold">{currentExam.userClass}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="dark:bg-black">
        <div className="border rounded-md border-gray-400">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">Add Question's</p>
              <p className="text-sm font-semibold px-8">Selected: {selectedQuestions.length}</p>
            </div>

            <p className="font-medium text-gray-500 dark:text-gray-400">Here's a list of your Questions!</p>
          </div>
          <div className="flex flex-row">
            <div className="px-4 py-2 w-1/3">
              <Input id="topic" placeholder="Search Topics . . ." className="dark:border-zinc-600 mt-2" />
            </div>
            <div className="mt-4">
              <Button className="dark:bg-white">
                <CirclePlus />
                Filter
              </Button>
            </div>
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
                    {question.question.split(" ").slice(0, 6).join(" ")} <span>. . .</span>
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
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                  <PaginationLink href="#">2</PaginationLink>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="p-4 flex justify-between">
            <Button>
              <AlertDialog>
                <AlertDialogTrigger>Selected Ques</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Your Selected {selectedQuestions.length} Questions</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Button>
            <Button className="w-28" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionBank;

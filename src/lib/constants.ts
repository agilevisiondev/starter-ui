import { Question } from "@/interfaces/test"
import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  Map,
  PieChart,
} from "lucide-react"

// This is sample data.
export const menuItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Courses",
      url: "/courses",
      icon: Frame,
    },
    {
      name: "Tests",
      url: "/tests",
      icon: PieChart,
    },
    {
      name: "Reports",
      url: "#",
      icon: Map,
    },
  ],
}

export const courses = [
  {
    id: "id-1736536618677-xh6bz1h",
    title: "Nursery School Overview",
    description: "Hey there this is your first lecture",
    color: "bg-green-600",
    classes: [1, 2, 3, 4, 5],
  },
  {
    id: "id-1736536864387-pt4b0oe",
    title: "Middle School Orientation",
    description: "Hello All this is your first class",
    color: "bg-red-600",
    classes: [5, 6, 7, 8, 9],
  },
  {
    id: "id-1736536864387-pt6b0oe",
    title: "High School Orientation",
    description: "Hello Again this is your first high school class",
    color: "bg-red-600",
    classes: [8, 9, 10],
  },
  {
    id: "id-1736537025015-1t1gdpq",
    title: "Computer Education ",
    description: "Computer Classes",
    color: "bg-red-600",
    classes: [4, 9],
  },
]

export const colors = [
  { id: "red", value: "bg-red-600" },
  { id: "green", value: "bg-green-600" },
  { id: "blue", value: "bg-blue-600" },
  { id: "orange", value: "bg-orange-600" },
  { id: "purple", value: "bg-purple-600" },
  { id: "indigo", value: "bg-indigo-600" },
  { id: "violet", value: "bg-violet-600" },
]

export const classes = [
  {
    id: 1,
    label: "I",
  },
  {
    id: 2,
    label: "II",
  },
  {
    id: 3,
    label: "III",
  },
  {
    id: 4,
    label: "IV",
  },
  {
    id: 5,
    label: "V",
  },
  {
    id: 6,
    label: "VI",
  },
  {
    id: 7,
    label: "VII",
  },
  {
    id: 8,
    label: "VIII",
  },
  {
    id: 9,
    label: "IX",
  },
  {
    id: 10,
    label: "X",
  },
] as const

export const fonts = [
  { id: "poppins", value: "Poppins" },
  { id: "inter", value: "Inter" },
  { id: "helvetica", value: "Helvetica" },
]
export const activeModules = [
  { id: "course", value: "Courses" },
  { id: "test", value: "Tests" },
  { id: "report", value: "Reports" },
] as const

export const questions: Question[] = [
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
    question: "The CSS property 'position: relative' positions an element relative to its nearest positioned ancestor.",
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
]

export const selectClasses = [
  {
    value: "1",
    label: "Class 1",
  },
  {
    value: "2",
    label: "Class 2",
  },
  {
    value: "3",
    label: "Class 3",
  },
  {
    value: "4",
    label: "Class 4",
  },
  {
    value: "5",
    label: "Class 5",
  },
  {
    value: "6",
    label: "Class 6",
  },
  {
    value: "7",
    label: "Class 7",
  },
  {
    value: "8",
    label: "Class 8",
  },
  {
    value: "9",
    label: "Class 9",
  },
  {
    value: "10",
    label: "Class 10",
  },
  {
    value: "11",
    label: "Class 11",
  },
  {
    value: "12",
    label: "Class 12",
  },
]

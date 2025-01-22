import DashboardPage from "@/layouts/DashboardPage"
import { CircleX, Clock, Download, Ellipsis, Mail, SquareKanban, SquareUser, UserRound } from "lucide-react"
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ColoredProgress } from "@/components/elements/ColoredProgress"
import clsx from "clsx"

interface Question {
  id: number
  text: string
  time: string
  score: string
  category: string
  categoryColor: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which factories have production results highe...",
    time: "00:01'",
    score: "1/1P",
    category: "DATA ANALYSIS",
    categoryColor: "bg-purple-100 text-purple-900",
  },
  {
    id: 2,
    text: "Please consider the following production resul...",
    time: "00:18'",
    score: "0/1P",
    category: "DATA ANALYSIS",
    categoryColor: "bg-purple-100 text-purple-900",
  },
  {
    id: 3,
    text: "What is the next correct letter in the following ...",
    time: "00:00'",
    score: "1/1P",
    category: "INDUCTIVE REASONING",
    categoryColor: "bg-orange-100 text-orange-900",
  },
  {
    id: 4,
    text: "Blueberries cost more than strawberries. Blue...",
    time: "00:27'",
    score: "0/1P",
    category: "GENERIC",
    categoryColor: "bg-blue-200 text-blue-900",
  },
]

const chartData = [{ browser: "safari", visitors: 33.33, fill: "var(--color-safari)" }]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "red",
  },
} satisfies ChartConfig

const categories = [
  { name: "Generic", color: "bg-blue-200", score: 70, total: 100 },
  { name: "Data analysis", color: "bg-green-200", score: 50, total: 80 },
  { name: "Inductive reasoning", color: "bg-red-200", score: 20, total: 50 },
]

const Reports = () => {
  const isMobileView = useIsMobile()

  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isAllExpanded, setIsAllExpanded] = useState(false)

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedItems([])
    } else {
      setExpandedItems(questions.map((q) => `question-${q.id}`))
    }
    setIsAllExpanded(!isAllExpanded)
  }
  return (
    <DashboardPage className="space-y-5 max-w-7xl">
      <Card className="flex justify-between">
        <p className="p-4 text-xl font-semibold">Example Reasoning Test</p>
        {isMobileView ? (
          <Ellipsis className="my-auto mr-5" />
        ) : (
          <div className="flex">
            <IconButton icon={UserRound} text="Respondent view" />
            <IconButton icon={Download} text="Download" />
            <IconButton icon={Mail} text="Send" hasBorder={false} />
          </div>
        )}
      </Card>
      <Card className="w-full p-4 pb-10 space-y-4">
        <CardDescription className="font-medium">RESPONDENT</CardDescription>
        <div className="flex items-center gap-4">
          <SquareUser />
          <p className="text-2xl font-bold">Mason Thomas</p>
        </div>
      </Card>
      <div className="grid-cols-2 space-y-4 xl:grid xl:space-y-0 xl:space-x-4">
        <Card className="flex flex-col">
          <CardContent className="flex-1 p-4 pb-0 md:flex">
            <div>
              <CardDescription className="font-medium">RESULT</CardDescription>
              <div className="flex items-center mt-4">
                <CircleX className="text-red-500" />
                <p className="ml-4 text-2xl font-bold text-red-500">Test failed</p>
              </div>
              <p className="ml-10">Respondent result is available</p>
            </div>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
              <RadialBarChart data={chartData} startAngle={0} endAngle={250} innerRadius={80} outerRadius={110}>
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="visitors" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="text-4xl font-bold fill-foreground">
                              {chartData[0].visitors.toLocaleString()}%
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                              2/6p.
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="p-4 space-y-4">
          <CardDescription className="font-medium">TIMER</CardDescription>
          <div className="flex items-center">
            <Clock />
            <p className="ml-5 text-2xl font-bold">Total Time</p>
          </div>
          <div className="pb-5 pl-12 mt-5 space-y-6">
            <div className="flex items-center space-x-4 text-xl font-bold text-gray-300">
              <p className="text-black dark:text-white">00:01:02</p>
              <p>/</p>
              <p>00:12:00</p>
            </div>
            <Progress value={33} className="h-3" />
            <div className="grid sm:grid-cols-2">
              <InfoRow label="Start time" value="17:04" />
              <InfoRow label="Date" value="2024-11-17" />
            </div>
            <InfoRow label="End time" value="17:05" />
          </div>
        </Card>
      </div>
      <Card className="w-full p-4 space-y-4">
        <CardDescription className="font-medium">
          Score per question category <span className="text-gray-400">(3)</span>
        </CardDescription>

        <div className="flex space-x-4">
          <SquareKanban />
          <div className="grid w-full gap-4 lg:grid-cols-2">
            {categories.map((category) => (
              <ColoredProgress
                key={category.name}
                value={category.score}
                max={category.total}
                label={category.name}
                colorClass={category.color}
                showDetails
              />
            ))}
          </div>
        </div>
      </Card>
      <Card className="w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">QUESTIONS</h2>
            <span className="text-gray-500">(4)</span>
          </div>
          <Button variant="ghost" className="flex items-center gap-2" onClick={toggleExpandAll}>
            {isAllExpanded ? "Collapse all" : "Expand all"}
            {isAllExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems}>
          {questions.map((question) => (
            <AccordionItem key={question.id} value={`question-${question.id}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Q. {question.id}</span>
                      <span className="flex-1 text-left">{question.text}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4 mr-5">
                    <span className="text-gray-500">{question.time}</span>
                    <span className={question.score.startsWith("1") ? "text-green-600" : "text-red-600"}>
                      {question.score}
                    </span>
                    <Badge variant="secondary" className={`${question.categoryColor}`}>
                      {question.category}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="py-4">Question .....</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </DashboardPage>
  )
}

export default Reports

type IconButtonProps = {
  icon: React.ComponentType<{ className?: string }>
  text: string
  hasBorder?: boolean
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, text, hasBorder = true, className }) => (
  <button
    className={clsx(
      "flex gap-x-4 p-4 font-extralight items-center hover:bg-gray-50 hover:text-black",
      { "border-r border-r-gray-200": hasBorder },
      className,
    )}
  >
    <span>
      <Icon className="size-5" />
    </span>
    <p className="hidden lg:block">{text}</p>
  </button>
)

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <p className="text-gray-500">
    {label} <span className="ml-5 text-black dark:text-white">{value}</span>
  </p>
)

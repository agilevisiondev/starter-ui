import React from "react"
import { useState } from "react"
import { RefreshCcw, MoreHorizontal, ChevronsUpDown, Grip, ArrowDownToDot, FilePenLine, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DashboardPage from "@/layouts/DashboardPage"

const presets = [
  { value: "creative", label: "Creative Writing" },
  { value: "technical", label: "Technical Writing" },
  { value: "business", label: "Business Writing" },
  { value: "academic", label: "Academic Writing" },
]

const models = [
  { value: "davinci", label: "text-davinci-003" },
  { value: "curie", label: "text-curie-001" },
  { value: "babbage", label: "text-babbage-001" },
  { value: "ada", label: "text-ada-001" },
]

const codeSnippet = `import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
    model="davinci",
    prompt="",
    temperature=0.9,
    max_tokens=5,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
)`

export default function Playground() {
  const [openPreset, setOpenPreset] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState("")
  const [activeTab, setActiveTab] = useState("complete")

  return (
    <DashboardPage>
      <Card>
        <CardHeader className="flex-row justify-between items-center border-b px-3 py-2 mb-4">
          <h1 className="font-medium">Playground</h1>
          <div className="flex gap-2">
            <Popover open={openPreset} onOpenChange={setOpenPreset}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  role="combobox"
                  aria-expanded={openPreset}
                  className="w-64 justify-between font-medium text-xs"
                >
                  {selectedPreset
                    ? presets.find((preset) => preset.value === selectedPreset)?.label
                    : "Load a preset..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <Command>
                  <CommandInput placeholder="Search presets..." />
                  <CommandList>
                    <CommandEmpty>No preset found.</CommandEmpty>
                    <CommandGroup>
                      {presets.map((preset) => (
                        <CommandItem
                          key={preset.value}
                          onSelect={() => {
                            setSelectedPreset(preset.value)
                            setOpenPreset(false)
                          }}
                        >
                          {preset.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <CustomHeaderButton children="Save" />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <CustomHeaderButton children="View code" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Card className="w-full max-w-2xl">
                  <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>View code</CardTitle>
                    <AlertDialogCancel>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </AlertDialogCancel>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>
                      You can use the following code to start integrating your current prompt and settings into your
                      application.
                    </CardDescription>
                    <Card className="p-4 text-sm text-white bg-black">
                      <pre>
                        <code>{codeSnippet}</code>
                      </pre>
                    </Card>
                    <CardDescription>
                      Your API Key can be found here. You should use environment variables or a secret management tool
                      to expose your key to your applications.
                    </CardDescription>
                  </CardContent>
                </Card>
              </AlertDialogContent>
            </AlertDialog>

            <CustomHeaderButton children="Share" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CustomHeaderButton>
                  <MoreHorizontal className="h-4 w-4" />
                </CustomHeaderButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="lg:flex">
            <PlaygroundSetting activeTab={activeTab} setActiveTab={setActiveTab} className="lg:hidden" />
            <Card className="border-none shadow-none w-full lg:w-4/5">
              {(() => {
                switch (activeTab) {
                  case "complete":
                    return <Textarea placeholder="Write Something ..." className="min-h-[600px] focus-visible:ring-0" />

                  case "insert":
                    return (
                      <div className="flex space-x-5 border-none">
                        <Textarea
                          placeholder="Write Something ..."
                          className="min-h-[600px] focus-visible:ring-0 border"
                        />
                        <Card className="bg-gray-100 w-full"></Card>
                      </div>
                    )

                  case "edit":
                    return (
                      <div>
                        <CardDescription className="text-black mb-2">Input</CardDescription>
                        <div className="flex space-x-5 border-none">
                          <div className="w-full space-y-3">
                            <Textarea
                              placeholder="Write Something ..."
                              className="min-h-[600px] focus-visible:ring-0 border"
                            />
                            <CardDescription className="text-black">Instructions</CardDescription>
                            <Textarea
                              placeholder="Write Something ..."
                              className="min-h-24 focus-visible:ring-0 border"
                            />
                          </div>
                          <Card className="bg-gray-100 w-full"></Card>
                        </div>
                      </div>
                    )
                }
              })()}
            </Card>
            <PlaygroundSetting activeTab={activeTab} setActiveTab={setActiveTab} className="hidden lg:block" />
          </div>
          <div className="flex gap-2 mt-5">
            <Button>Submit</Button>
            <Button variant="outline" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardPage>
  )
}

type SettingProps = {
  activeTab: string
  className?: string
  setActiveTab: (tab: string) => void
}
const PlaygroundSetting = ({ setActiveTab, activeTab, className }: SettingProps) => {
  const [temperature, setTemperature] = useState(0.5)
  const [maxLength, setMaxLength] = useState(256)
  const [openModel, setOpenModel] = useState(false)
  const [selectedModel, setSelectedModel] = useState("davinci")
  return (
    <div
      className={`grid grid-cols-3 space-x-3 mb-5 lg:space-y-6 lg:w-1/5 lg:pl-4 lg:grid-cols-1 lg:space-x-0 ${className}`}
    >
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Mode</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="complete">
              <Grip className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="insert">
              <ArrowDownToDot className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="edit">
              <FilePenLine className="size-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-medium">Model</h2>
        <Popover open={openModel} onOpenChange={setOpenModel}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              aria-expanded={openModel}
              className="w-full justify-between overflow-hidden"
            >
              {models.find((model) => model.value === selectedModel)?.label}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search models..." />
              <CommandList>
                <CommandEmpty>No model found.</CommandEmpty>
                <CommandGroup>
                  {models.map((model) => (
                    <CommandItem
                      key={model.value}
                      onSelect={() => {
                        setSelectedModel(model.value)
                        setOpenModel(false)
                      }}
                    >
                      {model.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3 lg:space-y-5">
        <div className="space-y-1 lg:space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Temperature</label>
            <span className="text-sm text-muted-foreground">{temperature}</span>
          </div>
          <Slider value={[temperature]} max={1} step={0.1} onValueChange={([value]) => setTemperature(value)} />
        </div>

        <div className="space-y-1 lg:space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Maximum Length</label>
            <span className="text-sm text-muted-foreground">{maxLength}</span>
          </div>
          <Slider value={[maxLength]} max={1000} step={1} onValueChange={([value]) => setMaxLength(value)} />
        </div>
      </div>
    </div>
  )
}

type CustomButtonProps = {
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

const CustomHeaderButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ onClick, className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        size="sm"
        onClick={onClick}
        className={`font-medium text-xs bg-gray-100 flex items-center justify-center gap-2 ${className}`}
        {...props}
      >
        {children}
      </Button>
    )
  },
)
CustomHeaderButton.displayName = "CustomHeaderButton"

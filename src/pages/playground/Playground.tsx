import { useState } from "react"
import { RefreshCcw, MoreHorizontal, ChevronsUpDown, Grip, ArrowDownToDot, FilePenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function Playground() {
  const [temperature, setTemperature] = useState(0.5)
  const [maxLength, setMaxLength] = useState(256)
  const [topP, setTopP] = useState(0.9)
  const [openPreset, setOpenPreset] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState("")
  const [openModel, setOpenModel] = useState(false)
  const [selectedModel, setSelectedModel] = useState("davinci")

  return (
    <DashboardPage>
      <Card>
        <CardHeader className="flex-row justify-between items-center border-b px-3 py-2 mb-4">
          <h1 className="font-medium">Playground</h1>
          <div className="flex items-center gap-2">
            <Popover open={openPreset} onOpenChange={setOpenPreset}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  role="combobox"
                  aria-expanded={openPreset}
                  className="w-[250px] justify-between font-medium text-xs"
                >
                  {selectedPreset
                    ? presets.find((preset) => preset.value === selectedPreset)?.label
                    : "Load a preset..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
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
            <Button variant="outline" size="sm" className="font-medium text-xs bg-gray-100">
              Save
            </Button>
            <Button variant="outline" size="sm" className="font-medium text-xs bg-gray-100">
              View code
            </Button>
            <Button variant="outline" size="sm" className="font-medium text-xs bg-gray-100">
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-medium text-xs bg-gray-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <Card className="w-4/5">
              <CardContent className="p-4">
                <Textarea
                  placeholder="Write a tagline for an ice cream shop"
                  className="min-h-[600px] resize-none border-0 focus-visible:ring-0"
                />
              </CardContent>
            </Card>
            <div className="space-y-6 w-1/5 pl-4">
              <div className="space-y-2">
                <h2 className="text-sm font-medium">Mode</h2>
                <Tabs defaultValue="complete" className="w-full">
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

              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Temperature</label>
                    <span className="text-sm text-muted-foreground">{temperature}</span>
                  </div>
                  <Slider value={[temperature]} max={1} step={0.1} onValueChange={([value]) => setTemperature(value)} />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Maximum Length</label>
                    <span className="text-sm text-muted-foreground">{maxLength}</span>
                  </div>
                  <Slider value={[maxLength]} max={1000} step={1} onValueChange={([value]) => setMaxLength(value)} />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Top P</label>
                    <span className="text-sm text-muted-foreground">{topP}</span>
                  </div>
                  <Slider value={[topP]} max={1} step={0.1} onValueChange={([value]) => setTopP(value)} />
                </div>
              </div>
            </div>
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

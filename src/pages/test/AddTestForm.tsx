import { useState } from "react"
import { Label } from "@radix-ui/react-label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import SimpleFormField from "@/components/elements/SimpleFormField"
import { cn } from "@/lib/utils"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Exam } from "@/interfaces/test"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { AlertDialogCancel } from "@/components/ui/alert-dialog"
import { selectClasses } from "@/lib/constants"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
function AddTestForm() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [date, setDate] = useState<Date | null>(null)
  const navigate = useNavigate()
  const testDefaultValues = {
    examName: "",
    userClass: "",
    duration: "",
    attempts: "",
    date: new Date(),
  }
  const testFormschema = z.object({
    examName: z.string().nonempty({ message: "Test name cannot be empty" }).min(5).max(23),
    userClass: z.string().nonempty({ message: "Class cannot be empty" }),
    duration: z.string().nonempty({ message: "Duration cannot be empty" }),
    attempts: z.string().nonempty({ message: "Attempts cannot be empty" }).max(1),
    date: z.date().refine((d) => d !== null, { message: "Date required" }),
  })
  type TestFormType = z.infer<typeof testFormschema>

  const testInstructionform = useForm<TestFormType>({
    resolver: zodResolver(testFormschema),
    defaultValues: testDefaultValues,
  })
  const handleAddTest = (data: any) => {
    const newExam: Exam = {
      id: Date.now().toString(),
      name: data.examName,
      userClass: data.userClass,
      date: date,
      duration: data.duration,
      attempts: data.attempts,
      questions: [],
    }
    localStorage.setItem("currentExam", JSON.stringify(newExam))
    navigate("/question")
  }
  return (
    <div>
      <Form {...testInstructionform}>
        <form onSubmit={testInstructionform.handleSubmit(handleAddTest)} className="mt-4">
          <div className="lg:grid lg:grid-cols-2 gap-4 space-y-1">
            <SimpleFormField
              form={testInstructionform}
              label="Exam Name"
              type="text"
              required
              name="examName"
              placeholder="Enter Name . . . "
              className="pt-1.5 text-start"
            />
            <div>
              <Label htmlFor="userClass" className="flex items-start">
                Class <span className="text-red-500">*</span>
              </Label>
              <FormField
                control={testInstructionform.control}
                name="userClass"
                render={({ field }) => (
                  <FormItem>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="justify-between font-normal mt-1.5 w-full dark:bg-black dark:text-zinc-400 dark:border-zinc-800"
                        >
                          {value
                            ? selectClasses.find((selectClass) => selectClass.value === value)?.label
                            : "Select Class . . ."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 dark:border-zinc-800">
                        <Command className="dark:bg-zinc-900">
                          <CommandInput placeholder="Search framework..." />
                          <CommandList>
                            <CommandEmpty>No class found.</CommandEmpty>
                            <CommandGroup className="dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-400">
                              {selectClasses.map((selectClass) => (
                                <CommandItem
                                  key={selectClass.value}
                                  value={selectClass.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    field.onChange(currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === selectClass.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {selectClass.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="date" className="flex items-start">
                Date <span className="text-red-500">*</span>
              </Label>
              <FormField
                control={testInstructionform.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal dark:bg-black dark:border-zinc-800 dark:text-zinc-400 mt-1.5",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="dark:text-zinc-600" />
                          {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto dark:bg-black dark:border-zinc-800" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(day) => {
                            setDate(day || null) // Update the state
                            field.onChange(day || null) // Update the form field
                          }}
                          initialFocus
                          className="dark:bg-black dark:text-white"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <AdvancedFormField form={testInstructionform} type="dateOfBirth" name="date" label="Date" required /> */}
            <SimpleFormField
              form={testInstructionform}
              label="Duration"
              type="time"
              required
              name="duration"
              placeholder="Enter duration . . . "
              className="text-start"
            />
            <SimpleFormField
              form={testInstructionform}
              label="Attempts"
              type="number"
              required
              name="attempts"
              placeholder="0"
              className="text-start"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel className="dark:bg-zinc-800 dark:border-zinc-800 dark:text-white">
              Cancel
            </AlertDialogCancel>
            <Button type="submit" className="mt-2 lg:mt-0 md:mt-0">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddTestForm

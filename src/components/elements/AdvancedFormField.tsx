import { useEffect, useState } from "react"
import clsx from "clsx"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { classes, fonts, modules, subjects } from "@/lib/constants"
import MultipleSelectorCreatable from "../ui/multiple-selector2"

interface AdvancedFormFieldProps {
  form: any
  type: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  options?: string[]
  onChange?: (value: any) => void
}

interface IClass {
  class_id: number
  classLabel: string
}

export default function AdvancedFormField({
  form,
  name,
  label,
  type,
  required,
  className,
  options = [],
  onChange,
}: AdvancedFormFieldProps) {
  const [classList, setClassList] = useState([])
  useEffect(() => {
    fetch("classes.json")
      .then((response) => response.json())
      .then((data) => setClassList(data))
  }, [])

  switch (type) {
    case "checkbox":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <div className="space-y-2">
                {options.map((option, id) => (
                  <div key={id} className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option)}
                        onCheckedChange={(checked) => {
                          const currentAnswers = field.value || []
                          const newAnswers = checked
                            ? [...currentAnswers, option]
                            : currentAnswers.filter((ans: string) => ans !== option)
                          field.onChange(newAnswers)
                          onChange?.(newAnswers)
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{option}</FormLabel>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    //classes check box - multiple selection
    case "classes":
      return (
        <div className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-wrap items-center gap-2 justify-normal">
            {classes.map((item, idx) => (
              <div key={item.id}>
                <FormField
                  control={form.control}
                  name={name}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value: any) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                        {idx === classes.length - 1 && <FormMessage />}
                      </FormItem>
                    )
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )
    // select class radio  buttons
    case "class":
      return (
        <div className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-x-2"
                  >
                    {classes.map((classItem) => (
                      <FormItem className="flex items-center space-x-2 space-y-0" key={classItem.id}>
                        <FormControl>
                          <RadioGroupItem value={classItem.id.toString()} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{classItem.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )
    case "subject":
      return (
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="max-w-xs flex-wrap">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    const subject = subjects.find((s) => s.id === value)
                    field.onChange(subject)
                  }}
                  defaultValue={field.value?.id}
                  className="flex space-x-4"
                >
                  {subjects.map((subject) => (
                    <FormItem key={subject.id} className="flex flex-col items-center">
                      <FormControl>
                        <RadioGroupItem
                          value={subject.id}
                          className={`w-4 h-4 rounded-full border-2 ${subject.color}`}
                        ></RadioGroupItem>
                      </FormControl>
                      <span className="text-xs mt-1">{subject.name}</span>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "select-class":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classList.map((item: IClass) => (
                    <SelectItem value={String(item.class_id)} key={item.class_id}>
                      {item.classLabel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "font":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem value={font.value} key={font.id}>
                      {font.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "modules":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="flex space-x-4">
                  {modules.map((module) => (
                    <div className="space-x-1.5 flex items-center" key={module.id}>
                      <Checkbox
                        checked={field.value?.includes(module.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, module.id])
                            : field.onChange(field.value?.filter((value: any) => value !== module.id))
                        }}
                      />
                      <Label>{module.value}</Label>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormDescription>Turn items on or off to control what's displayed in the app.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "date":
      const [isOpen, setIsOpen] = useState(false)
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1.5">{label}</FormLabel>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={clsx(
                        "w-full pl-3 hover:bg-transparent dark:bg-black text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date...</span>}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date?.toISOString().split("T")[0])
                      setIsOpen(false)
                    }}
                    disabled={(date) => date < new Date("1998-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "search-class":
      const [open, setOpen] = useState(false)
      const [value, setValue] = useState("")
      const hasValue = classList.find((selectClass: IClass) => selectClass.class_id.toString() === value)?.classLabel
      //!TODO Improve the above type check
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">{label}</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between font-normal text-sm"
                  >
                    {value ? hasValue : "Select Class . . ."}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search Class..." />
                    <CommandList>
                      <CommandEmpty>No class found.</CommandEmpty>
                      <CommandGroup>
                        {classList.map((selectClass: IClass) => (
                          <CommandItem
                            key={selectClass.class_id}
                            value={String(selectClass.class_id)}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              field.onChange(currentValue)
                              setOpen(!open)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === String(selectClass.class_id) ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {selectClass.classLabel}
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
      )
    case "select-subCategory":
      return (
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem className="max-w-xs flex-wrap">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <MultipleSelectorCreatable onChange={(selectedValue: any) => field.onChange(selectedValue)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    default:
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
  }
}

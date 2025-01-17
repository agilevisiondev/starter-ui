import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { selectClasses } from "@/lib/constants"

import { activeModules, classes, colors, fonts } from "@/lib/constants"
import clsx from "clsx"
        
interface AdvancedFormFieldProps {
  form: any
  type: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export default function AdvancedFormField({ form, name, label, type, className }: AdvancedFormFieldProps) {
  switch (type) {
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
    case "color":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-1">
                  {colors.map((color) => (
                    <FormItem className="flex items-center space-x-3 md:mt-2" key={color.id}>
                      <FormControl>
                        <RadioGroupItem value={color.value} color={color.value} />
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
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
            <FormItem>
              <FormLabel>{label}</FormLabel>
      
              <FormControl>
                <div className="flex space-x-2">
                  {activeModules.map((label) => (
                    <div className="space-x-1.5 flex items-center">
                      <Checkbox
                        checked={field.value?.includes(label.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, label.id])
                            : field.onChange(field.value?.filter((value: any) => value !== label.id))
                        }}
                      />
                      <Label className="font-medium">{label.value}</Label>
            <FormItem className="space-y-2">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="flex space-x-4">
                  {activeModules.map((module) => (
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
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1.5 flex">
                {label}
                {required && <span className="text-red-500">*</span>}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal dark:bg-black dark:border-zinc-800 dark:text-zinc-400 mt-1.5",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="dark:text-zinc-600 mr-2" />
                    {field.value && format(new Date(field.value), "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto dark:bg-black dark:border-zinc-800" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(day) => {
                      field.onChange(day || null)
                    }}
                    className="dark:bg-black dark:text-white"
                      field.onChange(date?.toISOString().split("T")[0])
                      setIsOpen(false)
                    }}
                    disabled={(date) => date > new Date() || date < new Date("1998-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "userClass":
      const [open, setOpen] = useState(false)
      const [value, setValue] = useState("")
      return (
        <FormField
          control={form.control}
          name="userClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1.5 flex">
                {label}
                {required && <span className="text-red-500">*</span>}
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between font-normal mt-1.5 w-full dark:bg-black dark:text-zinc-400 dark:border-zinc-800 text-slate-500 text-sm"
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
                              setOpen(!open)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", value === selectClass.value ? "opacity-100" : "opacity-0")}
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

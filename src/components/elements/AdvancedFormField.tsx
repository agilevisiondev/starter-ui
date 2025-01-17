import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Label } from "@/components/ui/label"
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
      const [isOpen, setIsOpen] = useState(false)
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1.5">{label}</FormLabel>
              <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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

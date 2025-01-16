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
const colors = [
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
export const fonts = [{ value: "Poppins" }, { value: "Inter" }, { value: "Helvetica" }]
export const activeModules = [
  { id: "course", value: "Course" },
  { id: "test", value: "Test" },
  { id: "report", value: "Report" },
] as const
export default function AdvancedFormField({ form, name, label, type, className }: AdvancedFormFieldProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  switch (type) {
    case "classes":
      return (
        <div className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center justify-normal flex-wrap gap-2">
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
                    <SelectItem value={font.value}>{font.value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "activeModules":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormDescription className="text-sm">
                Turn items on or off to control what's displayed in the app.
              </FormDescription>
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
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "dateOfBirth":
      return (
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1.5">Date of birth</FormLabel>
              <Popover 
                onOpenChange={(isOpen) => setPopoverOpen(isOpen)} 
                open={popoverOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-full pl-3 hover:bg-transparent dark:bg-black text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date...</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date); 
                      setTimeout(()=>{
                        setPopoverOpen(false);
                      },300)
                      
                    }}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );
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

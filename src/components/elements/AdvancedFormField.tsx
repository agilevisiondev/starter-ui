import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "../ui/checkbox"

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

export default function AdvancedFormField({ form, name, label, type, className }: AdvancedFormFieldProps) {
  switch (type) {
    case "class":
      return (
        <div className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center justify-normal flex-wrap gap-2">
            {classes.map((item) => (
              <div key={item.id}>
                <FormField
                  control={form.control}
                  name={name}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center space-x-2">
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
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            ))}
          </div>
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

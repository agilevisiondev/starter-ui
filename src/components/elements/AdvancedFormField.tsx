import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AdvancedFormFieldProps {
  form: any;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const colors = [
  { id: "red", value: "bg-red-600" },
  { id: "green", value: "bg-green-600" },
  { id: "blue", value: "bg-blue-600" },
  { id: "orange", value: "bg-orange-600" },
  { id: "purple", value: "bg-purple-600" },
  { id: "indigo", value: "bg-indigo-600" },
  { id: "violet", value: "bg-violet-600" },
];

export default function AdvancedFormField({ form, name, label, type, className }: AdvancedFormFieldProps) {
  switch (type) {
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
      );
  }
}

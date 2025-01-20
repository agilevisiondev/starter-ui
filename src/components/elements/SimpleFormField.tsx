// inputs - text, number, email,
// options - radio, checkbox, range, select, multiselect
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Textarea } from "@/components/ui/textarea"

interface SimpleFormFieldProps {
  form: any
  type: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
  optional?: boolean
  disabled?: boolean
  className?: string
}

export default function SimpleFormField({
  form,
  type,
  name,
  label,
  placeholder,
  required = false,
  optional = false,
  disabled = false,
  className,
}: SimpleFormFieldProps) {
  switch (type) {
    case "email":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label} {required && <Required />}
              </FormLabel>
              <FormControl>
                <Input type={type} {...field} placeholder="email@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "number":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label} {required && <Required />}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(event) => {
                    if (optional && event.target.value === "") {
                      field.onChange(false)
                    } else field.onChange(parseInt(event.target.value))
                  }}
                  placeholder={placeholder}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "url":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label} {required && <Required />}
              </FormLabel>
              <FormControl>
                <Input type={type} {...field} placeholder="www.google.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "password":
      const [visible, setVisible] = useState(false)
      const iconClass = "self-center w-5 h-5 -ml-10 cursor-pointer"
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>
                  {label} {required && <Required />}
                </FormLabel>
                <Link to="#" className="text-sm underline-offset-2 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex">
                <FormControl>
                  <Input type={visible ? "text" : "password"} {...field} />
                </FormControl>
                {visible ? (
                  <Eye className={iconClass} onClick={() => setVisible(!visible)} />
                ) : (
                  <EyeOff className={iconClass} onClick={() => setVisible(!visible)} />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    case "textarea":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {label}
                {required && <Required />}
              </FormLabel>
              <FormControl>
                <Textarea className="resize-none" placeholder={placeholder} rows={4} {...field} />
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
            <FormItem className={className}>
              <FormLabel>
                {label} {required && <Required />}
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder={placeholder} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
  }
}

const Required = () => <span className="ml-px text-red-500">*</span>

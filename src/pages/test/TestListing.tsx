import AdvancedFormField from "@/components/elements/AdvancedFormField"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import SimpleFormField from "@/components/elements/SimpleFormField"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardPage from "@/layouts/DashboardPage"
import { classes } from "@/lib/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function TestListing() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <DashboardPage>
        <DashboardPageTitle
          title="Your Tests"
          subTitle="Manage your tests."
          actionElement={
            <Button type="button" onClick={() => setOpen(true)}>
              Create Test
            </Button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <div>
            <AddTestForm />
          </div>
          <div>
            <AddTestForm />
          </div>
        </div>
      </DashboardPage>
    </div>
  )
}

const testFormSchema = z.object({
  title: z.string().nonempty({ message: "Test name cannot be empty" }).min(3).max(25),
  description: z.string().nonempty({ message: "Description cannot be empty" }).min(5).max(220),
  selectedClass: z.string().nonempty({ message: "Please select a class" }),
  date: z.string().nonempty({ message: "Date required" }),
  duration: z.string().optional(),
  attempts: z.union([z.boolean(), z.number()]).optional(),
})
type TestFormType = z.infer<typeof testFormSchema>

function AddTestForm() {
  const intialTestValues = {
    title: "",
    description: "",
    selectedClass: "",
    noOfQuestions: 0,
    date: "",
    duration: "",
    attempts: 0,
  }
  const AddTestForm = useForm<TestFormType>({
    resolver: zodResolver(testFormSchema),
    defaultValues: intialTestValues,
  })

  const handleCreateTest = (data: TestFormType) => {
    console.log(data)
  }

  return (
    <Form {...AddTestForm}>
      <form onSubmit={AddTestForm.handleSubmit(handleCreateTest)} className="space-y-3 text-left">
        <SimpleFormField form={AddTestForm} label="Title" type="text" name="title" />
        <AdvancedFormField form={AddTestForm} type="select-class" name="selectedClass" label="Class" required />
        <AdvancedFormField
          form={AddTestForm}
          type="date"
          name="date"
          label="Date"
          required
          placeholder="Pick a Date . . ."
        />
      </form>
    </Form>
  )
}

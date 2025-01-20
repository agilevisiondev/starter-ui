import SimpleFormField from "@/components/elements/SimpleFormField"

import { Form } from "@/components/ui/form"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Exam } from "@/interfaces/test"
import { z } from "zod"
import { AlertDialogCancel } from "@/components/ui/alert-dialog"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function AddTestForm() {
  const navigate = useNavigate()
  const testDefaultValues = {
    examName: "",
    userClass: "",
    duration: "",
    attempts: "",
    date: "",
  }
  const testFormschema = z.object({
    examName: z.string().nonempty({ message: "Test name cannot be empty" }).min(5).max(25),
    userClass: z.string().nonempty({ message: "Class cannot be empty" }),
    duration: z.string().nonempty({ message: "Duration cannot be empty" }),
    attempts: z.string().nonempty({ message: "Attempts cannot be empty" }).max(1),
    date: z.string().nonempty({ message: "Date required" }),
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
      date: data.date,
      duration: data.duration,
      attempts: data.attempts,
      questions: [],
    }
    localStorage.setItem("currentExam", JSON.stringify(newExam))
    navigate("/question")
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="dark:bg-white">Add Test</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none dark:bg-zinc-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Exam Instruction</AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <Form {...testInstructionform}>
                <form onSubmit={testInstructionform.handleSubmit(handleAddTest)} className="mt-4">
                  <div className="gap-4 space-y-1 lg:grid lg:grid-cols-2">
                    <SimpleFormField
                      form={testInstructionform}
                      label="Exam Name"
                      type="text"
                      required
                      name="examName"
                      placeholder="Enter Name . . . "
                      className="pt-1.5 text-start"
                    />
                    <AdvancedFormField
                      form={testInstructionform}
                      type="userClass"
                      name="userClass"
                      label="Class"
                      required
                    />
                    <AdvancedFormField
                      form={testInstructionform}
                      type="date"
                      name="date"
                      label="Date"
                      required
                      placeholder="Pick a Date . . ."
                    />
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
                  <div className="flex justify-end mt-4 space-x-2">
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
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddTestForm

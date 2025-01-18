import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import SimpleFormField from "@/components/elements/SimpleFormField"
import DashboardPage from "@/layouts/DashboardPage"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const testFormSchema = z.object({
  title: z.string().nonempty({ message: "Test name cannot be empty" }).min(3).max(25),
  description: z.string().nonempty({ message: "Description cannot be empty" }).min(5).max(220),
  selectedClass: z.string().nonempty({ message: "Please select a class" }),
  date: z.string().nonempty({ message: "Date required" }),
  duration: z.string().nonempty({ message: "Duration required" }),
  noOfQuestions: z
    .number({ message: "Only numbers allowed" })
    .min(1, { message: "Minimum 1 question required" })
    .max(1000),
  attempts: z.union([z.number(), z.boolean()]),
})
type TestFormType = z.infer<typeof testFormSchema>

export default function TestListing() {
  const intialTestValues = {
    selectedClass: "",
    title: "",
    description: "",
    date: "",
    duration: "",
    noOfQuestions: 1,
    attempts: false, //optional - number of attempts it retest allowed
  }
  const AddTestForm = useForm<TestFormType>({
    resolver: zodResolver(testFormSchema),
    defaultValues: intialTestValues,
  })
  console.log(AddTestForm.getValues())
  const handleCreateTest = (data: TestFormType) => {
    console.log(data)
  }

  return (
    <div>
      <DashboardPage>
        <DashboardPageTitle
          title="Tests & Assessments"
          subTitle="Manage your tests."
          actionElement={
            <Button type="button" onClick={AddTestForm.handleSubmit(handleCreateTest)}>
              Create Test
            </Button>
          }
        />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8"> */}
        <div>
          <Form {...AddTestForm}>
            <form onSubmit={AddTestForm.handleSubmit(handleCreateTest)} className="space-y-3 text-left">
              <AdvancedFormField
                form={AddTestForm}
                type="date"
                name="date"
                label="Date of Exam"
                required
                placeholder="Pick a Date . . ."
              />
              <AdvancedFormField form={AddTestForm} type="search-class" name="selectedClass" label="Class" required />
              <SimpleFormField
                form={AddTestForm}
                label="Title"
                type="text"
                name="title"
                placeholder="Unique titles like Semester Assessment 2"
              />
              <SimpleFormField form={AddTestForm} label="Number of Questions" type="number" name="noOfQuestions" />
              <SimpleFormField
                form={AddTestForm}
                label="Total Time Duration"
                type="text"
                name="duration"
                placeholder="eg. 2.5 hours, 30 mins , 4 hours"
              />
              <SimpleFormField
                form={AddTestForm}
                label="Number of Attempts? If Re-attempt is allowed"
                type="number"
                optional
                name="attempts"
                placeholder="eg. 2, 3, 4, Leave it blank otherwise"
              />
              <SimpleFormField
                form={AddTestForm}
                label="Description"
                type="textarea"
                name="description"
                placeholder="Type out the information describing the test that will be helpful for students and parents.."
              />
            </form>
          </Form>
        </div>
        <div>{/* <AddTestForm /> */}</div>
        {/* </div> */}
      </DashboardPage>
    </div>
  )
}

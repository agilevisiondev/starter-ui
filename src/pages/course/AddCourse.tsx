import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import SimpleFormField from "@/components/elements/SimpleFormField"
import DashboardPage from "@/layouts/DashboardPage"

import { generateUniqueId } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"

const CourseFormSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty({ message: "Title cannot be empty." }).min(5),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(5).max(220),
  subject: z.object({
    name: z.string().nonempty({ message: "Please select a subject." }),
    color: z.string().nonempty({ message: "Please select a color." }),
  }),
  category: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  class_id: z.string().min(1, { message: "Please select a class." }),
  subCategory: z.array(
    z.object({
      id: z.string().min(2),
      title: z.string().min(2),
    }),
  ),
})

type CourseFormType = z.infer<typeof CourseFormSchema>

export default function AddCourse() {
  const initialCourse: any = {
    id: generateUniqueId(),
    title: "",
    description: "",
    classes: [],
    category: { label: "Maths", value: "maths" },
    subject: { name: "Math", color: "bg-blue-500" },
    subCategory: [{ id: generateUniqueId(), title: "Introduction" }],
  }

  const CourseForm = useForm<CourseFormType>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: initialCourse,
  })

  const newCourse = { id: generateUniqueId(), title: "" }
  const courses = CourseForm.watch("subCategory")
  const navigate = useNavigate()
  const addCourse = () => {
    CourseForm.setValue("subCategory", [...courses, newCourse])
  }
  const removeCourse = (courseId: string) => {
    CourseForm.setValue(
      "subCategory",
      courses.filter((item) => item.id !== courseId),
    )
  }

  function onSubmitCourse(values: any) {
    console.log(values, JSON.stringify(CourseForm.getValues()))
    navigate("/courses")
  }

  // Development Log
  useEffect(() => {
    console.log(CourseForm.watch("id"))
  }, [
    CourseForm.watch("subject"),
    CourseForm.watch("class_id"),
    CourseForm.watch("title"),
    CourseForm.watch("description"),
    CourseForm.watch("category"),
  ])

  return (
    <DashboardPage className="max-w-xl">
      <DashboardPageTitle
        title="Create Course"
        subTitle="Manage your course"
        actionElement={
          <Button type="submit" onClick={CourseForm.handleSubmit(onSubmitCourse)}>
            Add Course
          </Button>
        }
      />
      <Form {...CourseForm}>
        <form onSubmit={CourseForm.handleSubmit(onSubmitCourse)}>
          <div className="p-3 space-y-2 rounded-md dark:bg-zinc-800">
            <div className="grid w-full grid-cols-2 gap-5">
              <AdvancedFormField form={CourseForm} type="search-class" name="class_id" label="Select Class" />
              <AdvancedFormField form={CourseForm} type="subject" name="subject" label="Select Subject" />
              <AdvancedFormField form={CourseForm} type="select-category" name="category" label="Select Category" />
              <SimpleFormField
              form={CourseForm}
              label="Title"
              type="text"
              required
              name="title"
              placeholder="Enter Course Title"
            />
            </div>
       
           
            <SimpleFormField
              form={CourseForm}
              label="Description"
              type="textarea"
              required
              name="description"
              placeholder="Enter Course Description"
            />
            <div className="space-y-1 hyphens-auto">
              <Label>Preview</Label>
              <CourseCard data={CourseForm.getValues()} />
            </div>
            <div className="space-y-1 hyphens-auto">
              <Label>Sub-Category</Label>
              {courses.map((course, idx) => {
                const currentcourse = courses.filter((item) => item.id === course.id)[0]
                const currentcourseIdx = courses.indexOf(currentcourse)
                return (
                  <div className="flex items-end space-x-2 w-full" key={course.id}>
                    <SimpleFormField
                      form={CourseForm}
                      label=""
                      type="text"
                      name={`courses[${currentcourseIdx}].title`}
                      className="w-full"
                    />
                    {idx === 0 && (
                      <Button type="button" onClick={addCourse}>
                        +
                      </Button>
                    )}
                    {idx !== 0 && <Button onClick={() => removeCourse(course.id)}>-</Button>}
                  </div>
                )
              })}
            </div>
          </div>
        </form>
      </Form>
    </DashboardPage>
  )
}

export const CourseCard = ({ data }: { data: CourseFormType }) => {
  const { title, description, subject, category } = data
  const subjectColor = subject?.color
  const categoryLabel = category && category.length > 0 && category[0].label
  return (
    <Card className={`${subjectColor} w-full text-white rounded-md overflow-hidden h-52`}>
      <CardHeader>
        <CardTitle>
          <Badge>{categoryLabel}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}


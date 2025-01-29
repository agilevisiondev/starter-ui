import { useEffect, useState } from "react"
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
  course_title: z.string().nonempty({ message: "Title cannot be empty." }).min(5),
  course_description: z.string().nonempty({ message: "Description cannot be empty." }).min(5).max(220),
  subject: z.object({
    name: z.string().nonempty({ message: "Please select a subject." }),
    color: z.string().nonempty({ message: "Please select a color." }),
  }),
  subCategory: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
    }),
  ),
  class_id: z.string().min(1, { message: "Please select a class." }),
})

type CourseFormType = z.infer<typeof CourseFormSchema>

export default function AddCourse() {
  //subject_id
  //chapters ;[]
  const initialCourse: any = {
    id: generateUniqueId(),
    course_title: "",
    course_description: "",
    class_id: "",
    subCategory: { id: "", value: "" },
    subject: { name: "", color: "" },
  }

  const CourseForm = useForm<CourseFormType>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: initialCourse,
  })

  const navigate = useNavigate()

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
    CourseForm.watch("course_title"),
    CourseForm.watch("course_description"),
    CourseForm.watch("subCategory"),
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
              <AdvancedFormField
                form={CourseForm}
                type="select-subCategory"
                name="subCategory"
                label="Select subCategory"
              />
              <SimpleFormField
                form={CourseForm}
                label="Title"
                type="text"
                required
                name="course_title"
                placeholder="Enter Course Title"
              />
            </div>

            <SimpleFormField
              form={CourseForm}
              label="Description"
              type="textarea"
              required
              name="course_description"
              placeholder="Enter Course Description"
            />
            <div className="space-y-1 hyphens-auto">
              <Label>Preview</Label>
              <CourseCard data={CourseForm.getValues()} />
            </div>
          </div>
        </form>
      </Form>
    </DashboardPage>
  )
}

export const CourseCard = ({ data }: { data: CourseFormType }) => {
  const { course_title, course_description, subject, subCategory } = data
  const subjectColor = subject?.color
  const subCategoryLabel = subCategory && subCategory.length > 0 && subCategory[0].value
  return (
    <Card className={`${subjectColor} w-full text-white rounded-md overflow-hidden h-52`}>
      <CardHeader>
        <CardTitle>
          <Badge>{subCategoryLabel}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardTitle>{course_title}</CardTitle>
        <p className="text-sm">{course_description}</p>
      </CardContent>
    </Card>
  )
}

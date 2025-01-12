import AdvancedFormField from "@/components/elements/AdvancedFormField"
import SimpleFormField from "@/components/elements/SimpleFormField"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import DashboardPage from "@/layouts/DashboardPage"
import { generateUniqueId } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const CourseFormSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty({ message: "Title cannot be empty." }).min(5),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(5).max(220),
  color: z.string().nonempty({ message: "Please select a color." }),
  classes: z.array(z.number()).nonempty({ message: "Please select a class." }),
})

type CourseFormType = z.infer<typeof CourseFormSchema>

export default function AddCourse() {
  const initialCourse = {
    id: generateUniqueId(),
    title: "",
    description: "",
    color: "bg-red-600",
    classes: [],
  }

  const CourseForm = useForm<CourseFormType>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: initialCourse,
  })
  const courseData = CourseForm.getValues()
  const navigate = useNavigate()

  function onSubmitCourse(values: any) {
    console.log(values, JSON.stringify(CourseForm.getValues()))
    navigate("/courses")
  }

  //? Development log
  useEffect(() => {
    console.log(CourseForm.watch("id"))
  }, [
    CourseForm.watch("color"),
    CourseForm.watch("classes"),
    CourseForm.watch("title"),
    CourseForm.watch("description"),
  ])

  return (
    <DashboardPage className="max-w-xl">
      <Form {...CourseForm}>
        <form onSubmit={CourseForm.handleSubmit(onSubmitCourse)}>
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-semibold">Create Course</h1>
            <hr />
            <Button type="submit" onClick={CourseForm.handleSubmit(onSubmitCourse)}>
              Add Course
            </Button>
          </div>
          <div className=" p-3 space-y-2 rounded-md dark:bg-zinc-800">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
              <AdvancedFormField form={CourseForm} type="color" name="color" label="Select Colors" />
              <AdvancedFormField form={CourseForm} type="class" name="classes" label="Classes" />
            </div>
            <SimpleFormField
              form={CourseForm}
              label="Title"
              type="text"
              required
              name="title"
              placeholder="Enter Course Title "
            />
            <SimpleFormField
              form={CourseForm}
              label="Description"
              type="textarea"
              required
              name="description"
              placeholder="Enter Course Description "
            />
            <div className="space-y-1 hyphens-auto">
              <Label>Preview</Label>
              {courseData.id && <CourseCard data={courseData} />}
            </div>
          </div>
        </form>
      </Form>
    </DashboardPage>
  )
}

export const CourseCard = ({ data }: { data: any }) => {
  const { classes, title, description, color } = data

  return (
    <Card className={`${color} w-full space-y-3 p-3 text-white rounded-md overflow-none h-52 max-h-52`}>
      <h2 className="text-base font-bold md:text-xl">{title}</h2>
      <p className="text-sm">{description}</p>
      {classes &&
        classes.map((item: any) => (
          <Badge key={item} className="mr-1">
            {item}
          </Badge>
        ))}
    </Card>
  )
}

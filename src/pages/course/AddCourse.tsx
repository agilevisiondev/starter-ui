import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, useWatch } from "react-hook-form"
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
  category: z.string().nonempty({ message: "Category cannot be empty." }).min(5),
  title: z.string().nonempty({ message: "Title cannot be empty." }).min(5),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(5).max(220),
  color: z.string().nonempty({ message: "Please select a color." }),
  class_id: z.string().min(1, { message: "Please select a class." }),
  sections: z.array(
    z.object({
      id: z.string().min(2),
      title: z.string().min(2),
    }),
  ),
})

type CourseFormType = z.infer<typeof CourseFormSchema>

export default function AddCourse() {
  const initialCourse :any = {
    id: generateUniqueId(),
    title: "",
    description: "",
    color: "bg-red-600",
    classes: [],
    category: "",
    sections: [{ id: generateUniqueId(), title: "Introduction" }],
  }

  const CourseForm = useForm<CourseFormType>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: initialCourse,
  })

  const newCourse = { id: generateUniqueId(), title: "" }
  const courses = CourseForm.watch("sections")
  const navigate = useNavigate()
  const addCourse = () => {
    CourseForm.setValue("sections", [...courses, newCourse])
  }
  const removeCourse = (courseId: string) => {
    CourseForm.setValue(
      "sections",
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
    CourseForm.watch("color"),
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
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-5">
              <AdvancedFormField form={CourseForm} type="search-class" name="class_id" label="Select Class" />
              <AdvancedFormField form={CourseForm} type="color" name="color" label="Select Subject" />
            </div>
            
            <SimpleFormField
              form={CourseForm}
              label="Category"
              type="text"
              required
              name="category"
              placeholder="Enter Category"
            />
            <SimpleFormField
              form={CourseForm}
              label="Title"
              type="text"
              required
              name="title"
              placeholder="Enter Course Title"
            />
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
  const { title, description, color,category } = data

  return (
    <Card className={`${color} w-full text-white rounded-md overflow-hidden h-52`}>
      <CardHeader>
        <CardTitle>
          <Badge>{category}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}
// export const CourseCard = ({ data }: { data: CourseFormType }) => {
//   const { classLabel, subjectName, courseLabel, courseName, courseDescription, color } = data

//   return (
//     <Card className={${color} w-full text-white rounded-md overflow-none h-52 max-h-52}>
//       <CardHeader>
//         <CardTitle>
//           <Badge>{courseName}</Badge>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <CardTitle>{courseLabel}</CardTitle>
//         <p className="text-sm">{courseDescription}</p>
//       </CardContent>
//     </Card>
//   )
// }

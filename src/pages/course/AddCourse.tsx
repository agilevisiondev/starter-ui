import AdvancedFormField from "@/components/elements/AdvancedFormField"
import SimpleFormField from "@/components/elements/SimpleFormField"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import DashboardPage from "@/layouts/DashboardPage"
import { generateUniqueId } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Course {
  id: string
  title: string
  description: string
  color: string
  classes: string[]
}

const CourseFormSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty({ message: "Title cannot be empty." }).min(2).max(50),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(4).max(150),
  color: z.string().nonempty({ message: "Please select a color." }),
  classes: z.array(z.string()).nonempty(),
})

type CourseFormType = z.infer<typeof CourseFormSchema>

export default function AddCourse() {
  const initialCourse = {
    id: generateUniqueId(),
    title: "",
    description: "",
    color: "",
    classes: [],
  }

  const CourseForm = useForm<CourseFormType>({
    // resolver: zodResolver(CourseFormSchema),
    defaultValues: initialCourse,
  })

  function onSubmitCourse(values: any) {
    console.log("first")
    console.log(cardData, values, CourseForm.getValues())
  }

  // const [cardData, setCardData] = useState<Course>(initialCourse)

  return (
    <DashboardPage className="max-w-xl">
      <Form {...CourseForm}>
        <form onSubmit={CourseForm.handleSubmit(onSubmitCourse)}>
          <div className="max-w-xl p-3 space-y-2 rounded-md dark:bg-zinc-800">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
              <AdvancedFormField form={CourseForm} type="color" name="color" label="Select Colors" />
              {/* <AdvancedFormField form={CourseForm} type="class" name="classes" label="Classes" /> */}
              <Button type="submit" onClick={CourseForm.handleSubmit(onSubmitCourse)}>
                Add Course
              </Button>
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
          </div>
        </form>
      </Form>
      <div className="space-y-1 hyphens-auto">
        <Label>Preview</Label>
        {/* {cardData && <CourseCard data={cardData} />} */}
      </div>
    </DashboardPage>
  )
}

const CourseCard = ({ data }: { data: any }) => {
  const { classes, title, description, color } = data
  return (
    <Card className={`${color} w-full space-y-2 p-3 text-white rounded-md overflow-none h-52`}>
      <h2 className="text-base font-bold md:text-xl">{title}</h2>
      <p className="text-sm">{description}</p>
      {classes.map((item: any, idx: any) => (
        <Badge key={idx} className="mr-1">
          {item.label}
        </Badge>
      ))}
    </Card>
  )
}

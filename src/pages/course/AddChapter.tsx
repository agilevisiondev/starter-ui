import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import SimpleFormField from "@/components/elements/SimpleFormField"
import DashboardPage from "@/layouts/DashboardPage"

import { generateUniqueId } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

const ChapterFormSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty({ message: "Title cannot be empty." }).min(5),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(5).max(220),
  color: z.string().nonempty({ message: "Please select a color." }),
  classOfChapter: z.string().nonempty({ message: "Please select a class." }),
  chapters: z.array(
    z.object({
      id: z.string().min(2),
      title: z.string().min(2),
    }),
  ),
})

type ChapterFormType = z.infer<typeof ChapterFormSchema>

export default function AddChapter() {
  const initialChapter = {
    id: generateUniqueId(),
    title: "",
    description: "",
    color: "bg-green-600",
    classOfChapter: "",
    chapters: [{ id: generateUniqueId(), title: "Introduction" }],
  }

  const ChapterForm = useForm<ChapterFormType>({
    resolver: zodResolver(ChapterFormSchema),
    defaultValues: initialChapter,
  })

  const newChapter = { id: generateUniqueId(), title: "" }
  const chapters = ChapterForm.watch("chapters")

  const chapterData = ChapterForm.getValues()
  const navigate = useNavigate()

  const addChapter = () => {
    ChapterForm.setValue("chapters", [...chapters, newChapter])
  }
  const removeChapter = (chapterId: string) => {
    ChapterForm.setValue(
      "chapters",
      chapters.filter((item) => item.id !== chapterId),
    )
  }
  function onSubmitChapter(values: ChapterFormType) {
    console.log(values, ChapterForm.getValues())
    navigate("/chapters")
  }

  //? Development log
  useEffect(() => {
    console.log(ChapterForm.watch("id"))
  }, [
    ChapterForm.watch("title"),
    ChapterForm.watch("description"),
    ChapterForm.watch("color"),
    ChapterForm.watch("classOfChapter"),
  ])

  return (
    <DashboardPage className="max-w-xl">
      <Form {...ChapterForm}>
        <form onSubmit={ChapterForm.handleSubmit(onSubmitChapter)}>
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-semibold">Add Chapter</h1>
            <hr />
            <Button type="submit" onClick={ChapterForm.handleSubmit(onSubmitChapter)}>
              Add Chapter
            </Button>
          </div>
          <div className="p-3 space-y-2 rounded-md dark:bg-zinc-800">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
              <AdvancedFormField form={ChapterForm} type="color" name="color" label="Select Colors" />
              <AdvancedFormField form={ChapterForm} type="class" name="classOfChapter" label="Select Class" />
            </div>
            <SimpleFormField
              form={ChapterForm}
              label="Title"
              type="text"
              required
              name="title"
              placeholder="Enter Chapter Name "
            />
            <SimpleFormField
              form={ChapterForm}
              label="Description"
              type="textarea"
              required
              name="description"
              placeholder="Enter Chapter Description "
            />
            <div className="space-y-1 hyphens-auto">
              <Label>Preview </Label>
            </div>
            <ChapterCard data={chapterData} />
            <div className="space-y-1 hyphens-auto">
              <Label>Table of Contents</Label>
              {chapters.map((chapter, idx) => {
                const currentChapter = chapters.filter((item) => item.id === chapter.id)[0]
                const currentChapterIdx = chapters.indexOf(currentChapter)
                return (
                  <div className="flex items-end space-x-2 w-full" key={chapter.id}>
                    <SimpleFormField
                      form={ChapterForm}
                      label=""
                      type="text"
                      name={`chapters[${currentChapterIdx}].title`}
                      className="w-full"
                    />
                    {idx === 0 && (
                      <Button type="button" onClick={addChapter}>
                        +
                      </Button>
                    )}
                    {idx !== 0 && <Button onClick={() => removeChapter(chapter.id)}>-</Button>}
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

export const ChapterCard = ({ data }: { data: any }) => {
  const { classOfChapter, title, description, color } = data

  return (
    <Card className={`${color} w-full space-y-3 p-3 text-white rounded-md overflow-none h-52 max-h-52`}>
      <h2 className="text-base font-bold md:text-xl">{title}</h2>
      <p className="text-sm">{description}</p>
      {classOfChapter && <Badge className="mr-1">{classOfChapter}</Badge>}
    </Card>
  )
}

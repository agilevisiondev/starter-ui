import AdvancedFormField from "@/components/elements/AdvancedFormField"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import DashboardPage from "@/layouts/DashboardPage"
import { generateUniqueId } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import SimpleFormField from "@/components/elements/SimpleFormField"

const chapterFormSchema = z.object({
  chapters: z.array(
    z.object({
      id: z.string().min(2),
      title: z.string().min(2),
    }),
  ),
})

type ChapterFormType = z.infer<typeof chapterFormSchema>

export default function AddChapter() {
  const [chaptersNew, setChaptersNew] = useState([])

  const ChapterForm = useForm<ChapterFormType>({
    resolver: zodResolver(chapterFormSchema),
    defaultValues: {
      chapters: [{ id: generateUniqueId(), title: "Introduction" }],
    },
  })
  const newChapter = { id: generateUniqueId(), title: "" }
  const chapters = ChapterForm.watch("chapters")

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
  }

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
              <AdvancedFormField form={ChapterForm} type="class" name="class" label="Class" />
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
              <Label>Table of Contents</Label>
            </div>
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
        </form>
      </Form>
    </DashboardPage>
  )
}

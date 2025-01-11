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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { generateUniqueId } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const chapterFormSchema = z.object({
  chapters: z.array(
    z.object({
      id: z.string().min(2),
      title: z.string().min(2),
    }),
  ),
})

type ChapterFormType = z.infer<typeof chapterFormSchema>

export default function AddChapter({ open, setOpen }: { open: boolean; setOpen: any }) {
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
  function onSubmit(values: ChapterFormType) {
    console.log(values, ChapterForm.getValues())
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Form {...ChapterForm}>
        <form onSubmit={ChapterForm.handleSubmit(onSubmit)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle> Add Chapters</AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
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
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => ChapterForm.reset()}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={ChapterForm.handleSubmit(onSubmit)}>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  )
}

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardPage from "@/layouts/DashboardPage"
import { SubmitHandler, useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface FormValues {
  videoUpload: FileList | null
  audioUpload: FileList | null
  pdfUpload: FileList | null
  imageUpload: FileList | null
  textContent: string
  subChapter: string
}
interface UploadedFile {
  name: string
  type: string
  data: string
}
type SubChapter = {
  subChapterName: string
}
export default function ContentUpload() {
  const form = useForm<FormValues>({
    defaultValues: {
      videoUpload: null,
      audioUpload: null,
      pdfUpload: null,
      imageUpload: null,
      textContent: "",
      subChapter: "",
    },
  })

  const [subChapters, setSubChapters] = useState<SubChapter[]>([])

  useEffect(() => {
    const selectedChapterId = localStorage.getItem("selectedChapterId")
    const chapterData = JSON.parse(localStorage.getItem("chapter") || "[]")
    console.log(chapterData)
    if (selectedChapterId && chapterData.length > 0) {
      const selectedChapter = chapterData.find((chapter: { id: number }) => chapter.id.toString() === selectedChapterId)
      if (selectedChapter) {
        setSubChapters(selectedChapter.subChapter)
      }
    }
  }, [])

  // Function to update localStorage grouped by subChapter and type
  const saveDataToSubChapter = (subChapter: string, type: string, files: UploadedFile[]) => {
    const existingData = JSON.parse(localStorage.getItem(subChapter) || "{}")
    const updatedData = {
      videos: existingData.videos || [],
      audios: existingData.audios || [],
      images: existingData.images || [],
      pdfs: existingData.pdfs || [],
      texts: existingData.texts || [],
    }

    if (type === "video") updatedData.videos.push(...files)
    if (type === "audio") updatedData.audios.push(...files)
    if (type === "image") updatedData.images.push(...files)
    if (type === "pdf") updatedData.pdfs.push(...files)
    if (type === "text") updatedData.texts.push(...files)

    localStorage.setItem(subChapter, JSON.stringify(updatedData))
  }

  // Function to process file uploads
  const processFiles = (
    fileList: FileList,
    type: string,
    subChapter: string,
    saveDataToSubChapter: (subChapter: string, type: string, files: UploadedFile[]) => void,
  ) => {
    const uploadedFiles: UploadedFile[] = []
    Array.from(fileList).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result as string
        uploadedFiles.push({
          name: file.name,
          type,
          data: (() => {
            switch (type) {
              case "audio":
              case "video":
              case "image":
                return URL.createObjectURL(file)
              default:
                return base64Data
            }
          })(),
        })

        if (uploadedFiles.length === fileList.length) {
          saveDataToSubChapter(subChapter, type, uploadedFiles)
        }
      }

      switch (type) {
        case "audio":
        case "video":
        case "image":
          reader.readAsArrayBuffer(file)
          break
        default:
          reader.readAsDataURL(file)
      }
    })
  }

  // Main handleSubmit function
  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.audioUpload && data.subChapter) {
      processFiles(data.audioUpload, "audio", data.subChapter, saveDataToSubChapter)
    }
    if (data.videoUpload && data.subChapter) {
      processFiles(data.videoUpload, "video", data.subChapter, saveDataToSubChapter)
    }
    if (data.imageUpload && data.subChapter) {
      processFiles(data.imageUpload, "image", data.subChapter, saveDataToSubChapter)
    }
    if (data.pdfUpload && data.subChapter) {
      processFiles(data.pdfUpload, "pdf", data.subChapter, saveDataToSubChapter)
    }
    if (data.textContent && data.subChapter) {
      const textFile: UploadedFile = {
        name: `text-${Date.now()}.txt`,
        type: "text",
        data: data.textContent,
      }
      saveDataToSubChapter(data.subChapter, "text", [textFile])
    }

    form.reset()
  }

  return (
    <DashboardPage className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Upload Course Content</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Chapter Content</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                name="subChapter"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="chapterSelect">Select Section / SubChapter</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="chapterSelect">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {subChapters.map((sub: SubChapter, i: number) => (
                          <SelectItem key={i} value={`${sub.subChapterName}`}>
                            {sub.subChapterName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="videoUpload"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="videoUpload">Select Videos</FormLabel>
                    <Input
                      id="videoUpload"
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(event.target.files)
                      }}
                      className="block mt-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="audioUpload"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="audioUpload">Select Audios</FormLabel>
                    <Input
                      id="audioUpload"
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(event.target.files)
                      }}
                      className="block mt-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="pdfUpload"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="pdfUpload">Select pdf</FormLabel>
                    <Input
                      id="pdfUpload"
                      type="file"
                      accept="application/pdf"
                      multiple
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(event.target.files)
                      }}
                      className="block mt-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="imageUpload"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="imageUpload">Select image</FormLabel>
                    <Input
                      id="pdfUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(event.target.files)
                      }}
                      className="block mt-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="textContent"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="textContent">Enter Plain Text</FormLabel>
                    <Textarea
                      id="textContent"
                      {...field}
                      rows={5}
                      className="block w-full mt-2 p-2 border rounded"
                      placeholder="Write or paste your text here..."
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Upload Content
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardPage>
  )
}

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import DashboardPage from "@/layouts/DashboardPage";
import { Plus } from "lucide-react";

const formSchema = z.object({
  chapterName: z.string().nonempty({ message: "Title cannot be empty." }).min(10),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(50).max(250),
  subChapter: z
    .array(
      z.object({
        subChapterName: z.string().nonempty({ message: "SubChapter name cannot be empty." }),
      }),
    )
    .min(1, { message: "Add at least one subchapter." }),
});

export function AddChapter() {
  const [subChapter, setSubChapter] = useState([{ subChapterName: "" }]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapterName: "",
      description: "",
      subChapter: [{ subChapterName: "" }],
    },
  });
  const handleAddSubChapter = () => {
    setSubChapter((prev) => [...prev, { subChapterName: "" }]);
    form.setValue("subChapter", [...subChapter, { subChapterName: "" }]);
  };

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const newCard = { id: Date.now(), ...data };
    form.reset();
    const existingCourses = JSON.parse(localStorage.getItem("chapter") || "[]");
    existingCourses.push(newCard);
    localStorage.setItem("chapter", JSON.stringify(existingCourses));
    navigate("/chapter");
  };

  return (
    <DashboardPage className="max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded-md max-w-xl p-3 space-y-6 dark:bg-zinc-800">
            <FormField
              control={form.control}
              name="chapterName"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-5">
                    <FormLabel>Chapter Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Write chapter name . . ." {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full gap-2 md:gap-5">
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write description.."
                          rows={6}
                          maxLength={250}
                          className="dark:bg-black text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subChapter"
                  render={() => (
                    <FormItem>
                      <FormLabel>Sub-Chapters</FormLabel>
                      {subChapter.map((_, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={`subChapter.${index}.subChapterName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder={`Sub-Chapter ${index + 1}`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button type="button" size="sm" variant="outline" className="mt-2" onClick={handleAddSubChapter}>
                        <Plus className="size-4" />
                        Add Sub-Chapter
                      </Button>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Add
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </DashboardPage>
  );
}

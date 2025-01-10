import AdvancedFormField from "@/components/elements/AdvancedFormField";
import SimpleFormField from "@/components/elements/SimpleFormField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiple-selector";
import DashboardPage from "@/layouts/DashboardPage";
import { generateUniqueId } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Course {
  id: string;
  title: string;
  description: string;
  color: string;
  classes: { label: string; value: string }[];
}

const Classes = [
  { label: "IV", value: "4" },
  { label: "V", value: "5" },
  { label: "VI", value: "6" },
  { label: "VII", value: "7" },
  { label: "VIII", value: "8" },
  { label: "IX", value: "9" },
  { label: "X", value: "10" },
];

const CourseFormSchema = z.object({
  id: z.string().nonempty(),
  title: z.string().nonempty({ message: "Title cannot be empty." }).min(10).max(50),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(50).max(150),
  color: z.string().nonempty({ message: "Please select a color." }),
  classes: z
    .array(
      z.object({
        value: z.string().nonempty({ message: "Value cannot be empty." }),
        label: z.string().nonempty({ message: "Label cannot be empty." }),
      }),
    )
    .refine((arr) => arr.length > 0, {
      message: "Select at least one class.",
    }),
});

type CourseFormType = z.infer<typeof CourseFormSchema>;

export default function AddCourse() {
  const initialCourse = {
    id: generateUniqueId(),
    title: "",
    description: "",
    color: "purple",
    classes: [],
  };

  const CourseForm = useForm<CourseFormType>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: initialCourse,
  });

  function onSubmitCourse(values: CourseFormType) {
    console.log(values);
  }

  const [cardData, setCardData] = useState<Course>({
    ...initialCourse,
    title: "Course Title",
    description: "Course Description",
  });

  useEffect(() => {
    setCardData(CourseForm.getValues());
  }, [CourseForm.getValues()]);

  return (
    <DashboardPage className="max-w-xl">
      <Form {...CourseForm}>
        <form onSubmit={CourseForm.handleSubmit(onSubmitCourse)}>
          <div className="max-w-xl p-3 space-y-2 rounded-md dark:bg-zinc-800">
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
              <AdvancedFormField form={CourseForm} type="color" name="color" label="Select Colors" />
              <FormField
                control={CourseForm.control}
                name="classes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        defaultOptions={Classes}
                        className="dark:bg-black"
                        placeholder="Select Class..."
                        creatable
                        onChange={(selectedOptions) => {
                          field.onChange(selectedOptions);
                        }}
                        emptyIndicator={<p>No Results.</p>}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SimpleFormField
              form={CourseForm}
              label="Title"
              type="text"
              required
              name="title"
              placeholder="Enter Course Title "
            />
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
              <SimpleFormField
                form={CourseForm}
                label="Description"
                type="textarea"
                required
                name="description"
                placeholder="Enter Course Description "
              />
              <div className="space-y-1 hyphens-auto">
                <FormLabel>Preview</FormLabel>
                <CourseCard data={cardData} />
              </div>
            </div>
            <Button type="submit">Add Course</Button>
          </div>
        </form>
      </Form>
    </DashboardPage>
  );
}

const CourseCard = ({ data }) => {
  const { classes, title, description, color } = data;
  return (
    <Card className={`${color} w-full space-y-3 p-3 text-white rounded-md overflow-none h-52`}>
      <h2 className="text-base font-bold md:text-xl">{title}</h2>
      <p className="text-sm">{description}</p>
      {classes.map((item, idx) => (
        <Badge key={idx} className="mr-1">
          {item.label}
        </Badge>
      ))}
    </Card>
  );
};

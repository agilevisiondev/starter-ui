import SimpleFormField from "@/components/elements/SimpleFormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Textarea } from "@/components/ui/textarea";
import DashboardPage from "@/layouts/DashboardPage";
import { generateUniqueId } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
    // navigate("/");
  }

  return (
    <DashboardPage className="max-w-xl">
      <Form {...CourseForm}>
        <form onSubmit={CourseForm.handleSubmit(onSubmitCourse)}>
          <div className="max-w-xl p-3 space-y-6 rounded-md dark:bg-zinc-800">
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
                      emptyIndicator={<></>}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SimpleFormField
              form={CourseForm}
              label="Course Title"
              type="text"
              required
              name="title"
              placeholder="Enter Course Title "
            />
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
              <div>
                <SimpleFormField
                  form={CourseForm}
                  label="Description"
                  type="textarea"
                  required
                  name="description"
                  placeholder="Enter Course Description "
                />
                {/* Color Selection */}
                <div className="w-full mt-4">
                  <FormField
                    control={CourseForm.control}
                    name="color"
                    render={() => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          {/* <div className="flex md:gap-2.5 gap-3.5 p-2.5 bg-gray-200 dark:bg-slate-950 rounded-lg">
                            {colors.map((color) => (
                              <div
                                key={color}
                                className={`rounded-full w-3 h-3 cursor-pointer ${
                                  selectedColor === color ? "ring-2 ring-black" : ""
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorSelect(color)}
                              />
                            ))}
                          </div> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* {cardData && (
                <Card
                  style={{ backgroundColor: cardData.color }}
                  title={cardData.title}
                  description={cardData.description}
                  classValue={cardData.class}
                />
              )} */}
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="default" size="lg">
                Add
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </DashboardPage>
  );
}

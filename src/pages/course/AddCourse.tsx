import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import DashboardPage from "@/layouts/DashboardPage";

interface DataProps {
  title: string;
  description: string;
  color: string;
  class: { label: string; value: string }[];
}

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title cannot be empty." }).min(10),
  description: z.string().nonempty({ message: "Description cannot be empty." }).min(200),
  color: z.string().nonempty({ message: "Please select a color." }),
  class: z
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

const OPTIONS: Option[] = [
  { label: "IV", value: "4th" },
  { label: "V", value: "5th" },
  { label: "VI", value: "6th" },
  { label: "VII", value: "7th" },
  { label: "VIII", value: "8th" },
  { label: "IX", value: "9th" },
  { label: "X", value: "10th" },
];

export function AddCourse() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [cardData, setCardData] = useState<DataProps | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      color: "",
      class: [],
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const newCard = { ...data };
    setCardData(newCard);
    form.reset();
    setSelectedColor(null);

    const existingCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    existingCourses.push(newCard);
    localStorage.setItem("courses", JSON.stringify(existingCourses));

    navigate("/course", {
      state: { displayCardData: [newCard] },
    });
  };

  const handleColorSelect = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor(null);
      form.setValue("color", "");
    } else {
      setSelectedColor(color);
      form.setValue("color", color);
    }
  };

  useEffect(() => {
    const values = form.getValues();
    if (values.title || values.description || values.color || values.class) {
      setCardData({
        title: values.title,
        description: values.description,
        color: values.color,
        class: values.class,
      });
    }
  }, [form.watch("title"), form.watch("description"), form.watch("color"), form.watch("class")]); //to track the values of the title, description, and color fields and to render input values.
  console.log(cardData);
  const colors = ["red", "green", "blue", "orange", "purple", "black", "indigo", "maroon", "violet"];
  return (
    <DashboardPage className="max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-xl p-3 space-y-6 rounded-md dark:bg-zinc-800">
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <MultipleSelectorCreatable field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-5">
                    <FormLabel>Title</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Write title.." {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-5">
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write description.."
                          rows={6}
                          className="text-sm dark:bg-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Color Selection */}
                <div className="w-full mt-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={() => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <div className="flex md:gap-2.5 gap-3.5 p-2.5 bg-gray-200 dark:bg-slate-950 rounded-lg">
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
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {cardData && (
                <Card
                  style={{ backgroundColor: cardData.color }}
                  title={cardData.title}
                  description={cardData.description}
                  classValue={cardData.class}
                />
              )}
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
const MultipleSelectorCreatable = ({ field }: { field: any }) => {
  return (
    <MultipleSelector
      {...field}
      defaultOptions={OPTIONS}
      className="dark:bg-black"
      placeholder="Select Class..."
      creatable
      onChange={(selectedOptions) => {
        field.onChange(selectedOptions);
      }}
      emptyIndicator={<p className="text-sm text-center text-gray-600 dark:text-gray-400">no results found.</p>}
    />
  );
};

interface CardProps {
  style?: any;
  title: string;
  description: string;
  classValue?: { label: string; value: string }[];
}

const Card = ({ style, title, description, classValue }: CardProps) => {
  return (
    <div>
      <p className="text-sm font-medium my-1.5">Preview</p>
      <div
        className={`w-full p-3 mx-auto mb-3 h-40 text-white rounded-md md:h-52 md:mb-6 dark:bg-slate-950 bg-gray-500 overflow-y-scroll`}
        style={style}
      >
        <div className="flex justify-end">
          {Array.isArray(classValue) &&
            classValue.map((classItem, index) => (
              <Badge key={index} variant="default" className="ml-0.5">
                {classItem.label}
              </Badge>
            ))}
        </div>
        <h2 className="mb-3 text-base font-bold md:text-xl">{title || "Title"}</h2>
        <p className="text-xs md:text-sm">{description || "Description"}</p>
      </div>
    </div>
  );
};

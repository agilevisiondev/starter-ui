import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

interface DataProps {
  title: string;
  description: string;
  color: string;
}

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title cannot be empty." }),
  description: z.string().nonempty({ message: "Description cannot be empty." }),
  color: z.string().nonempty({ message: "Please select a color." }),
});

const OPTIONS: Option[] = [
  { label: "4th", value: "4th" },
  { label: "5th", value: "5th" },
  { label: "6th", value: "6th" },
  { label: "7th", value: "7th" },
  { label: "8th", value: "8th" },
  { label: "9th", value: "9th" },
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

    navigate("/courses", {
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
    if (values.title || values.description || values.color) {
      setCardData({
        title: values.title,
        description: values.description,
        color: values.color,
      });
    }
  }, [form.watch("title"), form.watch("description"), form.watch("color")]); //to track the values of the title, description, and color fields

  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "black",
    "indigo",
    "maroon",
    "violet",
  ];

  return (
    <div>
      <div className="bg-gray-50 py-2 md:px-6 px-3 w-full lg:w-3/4 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write title.."
                      {...field}
                      className="text-sm md:text-normal md:placeholder:text-sm placeholder:text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full grid-cols-2 md:gap-5 gap-2">
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
                          rows={8}
                          className="text-sm md:text-normal md:placeholder:text-sm placeholder:text-xs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Color Selection */}
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={() => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <div className="flex bg-gray-200 py-2 px-5 lg:gap-3 gap-2 rounded-xl">
                            {colors.map((color) => (
                              <div
                                key={color}
                                className={`rounded-full lg:w-5 lg:h-5 h-2 w-2 cursor-pointer ${
                                  selectedColor === color
                                    ? "ring-2 ring-black"
                                    : ""
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

                <div>
                  <p className="text-sm font-medium mt-5 mb-3">
                    Select a Class
                  </p>
                  <MultipleSelectorCreatable />
                </div>
              </div>

              {cardData ? (
                <div>
                  <p className="text-sm font-medium my-1.5">Preview</p>
                  <div
                    className="mx-auto w-full min-h-64 md:mb-6 mb-3 md:px-5 p-3 rounded-md bg-slate-500 text-white"
                    style={{ backgroundColor: cardData.color }}
                  >
                    <h2 className="md:text-2xl text-lg font-semibold mb-3">
                      {cardData.title}
                    </h2>
                    <p className="text-sm md:text-normal">
                      {cardData.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium my-1.5">Data:</p>
                  <div className="mx-auto w-full min-h-64 md:mb-6 mb-3 md:px-5 p-3 text-white rounded-md bg-gray-500 ">
                    <h2 className="md:text-2xl text-lg font-semibold mb-3">
                      Some Title
                    </h2>
                    <p className="text-sm md:text-normal">Some Description</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="default" size="lg">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
const MultipleSelectorCreatable = () => {
  return (
    <MultipleSelector
      defaultOptions={OPTIONS}
      placeholder="Class..."
      creatable
      emptyIndicator={
        <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
          no results found.
        </p>
      }
    />
  );
};

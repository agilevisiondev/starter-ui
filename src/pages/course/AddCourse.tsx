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
import DashboardPage from "@/layouts/DashboardPage";

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
    "teal",
    "darkslategray",
  ];

  return (
    <DashboardPage>
      <div className="p-2 rounded-md bg-gray-50 md:px-6 lg:w-3/4 dark:bg-slate-900">
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
            <div className="grid w-full grid-cols-2 gap-2 md:gap-5 relative">
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
                <div className="mt-4 md:w-1/2 absolute w-full">
                  <FormField
                    control={form.control}
                    name="color"
                    render={() => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <div className="flex gap-2 px-5 py-2 bg-gray-200 dark:bg-slate-950 rounded-lg">
                            {colors.map((color) => (
                              <div
                                key={color}
                                className={`rounded-full lg:w-3 lg:h-3 h-2 w-2 cursor-pointer ${
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

                <div className="absolute w-full md:w-1/2 mt-20">
                  <p className="mt-5 mb-3 text-sm font-medium">
                    Select a Class
                  </p>
                  <MultipleSelectorCreatable />
                </div>
              </div>

              {cardData ? (
                <div>
                  <p className="text-sm font-medium my-1.5">Preview</p>
                  <div
                    className="w-full p-3 mx-auto mb-3 text-white rounded-md md:min-h-64 md:mb-6 md:px-5 bg-slate-500"
                    style={{ backgroundColor: cardData.color }}
                  >
                    <h2 className="mb-3 text-sm font-semibold md:text-2xl">
                      {cardData.title}
                    </h2>
                    <p className="text-xs md:text-normal">
                      {cardData.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium my-1.5">Data:</p>
                  <div className="w-full p-3 mx-auto mb-3 text-white min-h-44 dark:bg-slate-950 bg-gray-500 rounded-md md:min-h-64 md:mb-6 md:px-5 ">
                    <h2 className="mb-3 text-sm font-semibold md:text-2xl">
                      Some Title
                    </h2>
                    <p className="text-sm md:text-normal">Some Description</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="mt-40 md:mt-16 dark:text-white"
              >
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardPage>
  );
}
const MultipleSelectorCreatable = () => {
  return (
    <MultipleSelector
      defaultOptions={OPTIONS}
      placeholder="Class..."
      creatable
      emptyIndicator={
        <p className="text-sm leading-10 text-center text-gray-600 dark:text-gray-400">
          no results found.
        </p>
      }
    />
  );
};

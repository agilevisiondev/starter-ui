import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title cannot be empty." }),
  description: z.string().nonempty({ message: "Description cannot be empty." }),
  color: z.string().nonempty({ message: "Please select a color." }),
});

export function AddCourse() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [cardData, setCardData] = useState<{
    title: string;
    description: string;
    color: string;
  } | null>(null);

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
    const data = form.getValues();
    setSelectedColor(color);
    form.setValue("color", color);
    if (data.title && data.description) {
      setCardData({ ...data, color });
    }
  };

  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "black",
    "indigo",
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
                          <div className="flex bg-gray-100 py-2 px-5 lg:gap-3 gap-2 rounded-xl">
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
              </div>
              {cardData ? (
                <div>
                  <p className="text-sm font-medium my-1.5">Data:</p>
                  <div
                    className="mx-auto w-full max-h-max md:mb-6 mb-3 md:px-5 p-3 rounded-md text-white"
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
                <p className="text-sm font-normal ml-10 pb-12 my-auto">
                  Please fill in the form to display the course card.
                </p>
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Timer } from "lucide-react";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Exam } from "./types";
const Formschema = z.object({
  examName: z.string().nonempty({ message: "Test name cannot be empty" }).min(5).max(23),
  userClass: z.string().nonempty({ message: "Class cannot be empty" }),
  duration: z.string().nonempty({ message: "Duration cannot be empty" }),
  attempts: z.string().nonempty({ message: "Attempts cannot be empty" }).max(1),
  date: z.date().refine((d) => d !== null, { message: "Date required" }),
});

export default function Test() {
  const [date, setDate] = useState<Date | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(Formschema),
    defaultValues: {
      examName: "",
      userClass: "",
      duration: "",
      attempts: "",
      date: date,
    },
  });

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams") || "[]");
    setExams(storedExams);
  }, []);

  const handleAddTest = (data: any) => {
    const newExam: Exam = {
      id: Date.now().toString(),
      name: data.examName,
      userClass: data.userClass,
      date: date,
      duration: data.duration,
      attempts: data.attempts,
      questions: [],
    };
    localStorage.setItem("currentExam", JSON.stringify(newExam));
    navigate("/Question");
  };
  const deleteTest = (id: string) => {
    const storedExams = JSON.parse(localStorage.getItem("exams") || "[]");
    const updatedExams = storedExams.filter((exam: Exam) => exam.id !== id);
    localStorage.setItem("exams", JSON.stringify(updatedExams));
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const frameworks = [
    {
      value: "6",
      label: "Class 6",
    },
    {
      value: "7",
      label: "Class 7",
    },
    {
      value: "8",
      label: "Class 8",
    },
    {
      value: "9",
      label: "Class 9",
    },
    {
      value: "10",
      label: "Class 10",
    },
    {
      value: "11",
      label: "Class 11",
    },
    {
      value: "12",
      label: "Class 12",
    },
  ];
  console.log(exams);

  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <h1 className="text-2xl font-semibold">Tests</h1>
        {/* Modal for Add Test */}
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className="dark:bg-white">Add Test</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-zinc-900 border-none">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">Exam Instruction</AlertDialogTitle>
              <AlertDialogDescription>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddTest)} className="mt-4">
                    <div className="lg:grid lg:grid-cols-2 gap-4 space-y-1">
                      <div className="mt-1">
                        <Label htmlFor="examName" className="flex items-start">
                          Exam Name <span className="text-red-500">*</span>
                        </Label>
                        <FormField
                          control={form.control}
                          name="examName"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter Name . . . "
                                    className="placeholder-slate-300 mt-1 dark:text-zinc-400"
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="userClass" className="flex items-start">
                          Class <span className="text-red-500">*</span>
                        </Label>
                        <FormField
                          control={form.control}
                          name="userClass"
                          render={({ field }) => (
                            <FormItem>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="justify-between font-normal mt-1 w-full dark:bg-black dark:text-zinc-400"
                                  >
                                    {value
                                      ? frameworks.find((framework) => framework.value === value)?.label
                                      : "Select Class . . ."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0 dark:border-zinc-800">
                                  <Command className="dark:bg-zinc-900">
                                    <CommandInput placeholder="Search framework..." />
                                    <CommandList>
                                      <CommandEmpty>No class found.</CommandEmpty>
                                      <CommandGroup className="dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-400">
                                        {frameworks.map((framework) => (
                                          <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                              setValue(currentValue === value ? "" : currentValue);
                                              field.onChange(currentValue);
                                              setOpen(false);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0",
                                              )}
                                            />
                                            {framework.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="date" className="flex items-start">
                          Date <span className="text-red-500">*</span>
                        </Label>
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal dark:bg-black dark:border-zinc-800 dark:text-zinc-400 mt-1",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="dark:text-zinc-600" />
                                    {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto dark:bg-black dark:border-zinc-800" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(day) => {
                                      setDate(day || null); // Update the state
                                      field.onChange(day || null); // Update the form field
                                    }}
                                    initialFocus
                                    className="dark:bg-black dark:text-white"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration" className="flex items-start">
                          Duration <span className="text-red-500">*</span>
                        </Label>
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex">
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="time"
                                    placeholder="0"
                                    className="placeholder-slate-300 mt-1 dark:text-zinc-400"
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="attempts" className="flex items-start">
                          Attempts <span className="text-red-500">*</span>
                        </Label>
                        <FormField
                          control={form.control}
                          name="attempts"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex">
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    placeholder="0"
                                    className="placeholder-slate-300 mt-1 dark:text-zinc-400"
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <AlertDialogCancel className="dark:bg-zinc-800 dark:border-zinc-800 dark:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <Button type="submit" className="mt-2 lg:mt-0 md:mt-0">
                        Continue
                      </Button>
                    </div>
                  </form>
                </Form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {/* Test Card  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {exams.map((exam) => (
          <div key={exam.id} className="border rounded-xl py-2 px-2 dark:bg-zinc-900 dark:border-zinc-600">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <p className="bg-white rounded-xl p-1 text-xs font-medium dark:text-black">
                  {exam.date ? new Date(exam.date).toLocaleDateString() : "No Date"}
                </p>
                <div className="flex">
                  {/* <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className="cursor-pointer bg-white rounded-xl p-1 text-xs font-medium dark:text-black"
                          onClick={() => deleteTest(exam.id)}
                        >
                          <Pencil size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider> */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className="cursor-pointer bg-white rounded-xl p-1 text-xs font-medium dark:text-black"
                          onClick={() => deleteTest(exam.id)}
                        >
                          <Trash size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xs font-medium">Class {exam.userClass}</h2>
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">{exam.name}</h2>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xs font-semibold">{exam.attempts} Attempts</h2>
                </div>
                <div>
                  <h2 className="text-xs font-semibold">{exam.questions.length} Question</h2>
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center sticky bottom-1">
              <div>
                <div className="text-md font-semibold flex gap-1 items-center ">
                  <Timer size={20} color="red" /> <span className="text-black dark:text-white">{exam.duration}</span>
                </div>
              </div>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="dark:bg-white">Preview</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="dark:bg-zinc-900 border-none ">
                    <AlertDialogHeader className=" rounded-md">
                      <div className="flex justify-between items-center border-b-2 dark:border-zinc-600 p-2">
                        <AlertDialogTitle className="text-2xl">Exam Preview</AlertDialogTitle>
                        <div className="flex justify-end">
                          <AlertDialogAction className="dark:bg-zinc-800 dark:border-zinc-800 dark:text-white lg:mt-2">
                            X
                          </AlertDialogAction>
                        </div>
                      </div>
                      <AlertDialogDescription className="max-h-96 overflow-auto p-2">
                        <div className="max-w-2xl mx-auto shadow-md rounded-lg overflow-hidden dark:bg-zinc-900 text-black dark:text-zinc-400">
                          <div className="p-2">
                            <h2 className="text-2xl font-bold mb-5 dark:text-gray-200">{exam.name}</h2>
                            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-4">
                              class: {exam.userClass}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex gap-1 items-center">
                                <p className="text-zinc-400 font-semibold">Date:</p>
                                <p className="font-semibold dark:text-gray-200">
                                  {exam.date ? new Date(exam.date).toLocaleDateString() : "No Date"}
                                </p>
                              </div>
                              <div className="flex gap-1 items-center">
                                <p className="text-zinc-400 font-semibold">Duration:</p>
                                <p className="font-semibold dark:text-gray-200">{exam.duration}</p>
                              </div>
                              <div className="flex gap-1 items-center">
                                <p className="text-zinc-400 font-semibold">Questions:</p>
                                <p className="font-semibold dark:text-gray-200">{exam.questions.length}</p>
                              </div>
                              <div className="flex gap-1 items-center">
                                <p className="text-zinc-400 font-semibold">Attempts:</p>
                                <p className="font-semibold dark:text-gray-200">{exam.attempts}</p>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold mb-3">Questions:</h3>
                              <ul className="space-y-3">
                                {exam.questions.map((question, index) => (
                                  <li
                                    key={question.id}
                                    className="bg-gray-100 dark:bg-black dark:text-zinc-400 p-3 rounded"
                                  >
                                    <span className="font-medium mr-2">{index + 1}.</span>
                                    {question.question}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

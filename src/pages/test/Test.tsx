import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function Test() {
  const [date, setDate] = React.useState<Date>();
  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <h1 className="text-2xl font-semibold">Tests</h1>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button>Add Test</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-zinc-900 border-none">
            <AlertDialogHeader>
              <AlertDialogTitle>Exam Instruction</AlertDialogTitle>
              <AlertDialogDescription className="lg:grid lg:grid-cols-2 gap-2 pt-4 lg:space-y-1 space-y-4">
                <div className="mt-1">
                  <div className="flex justify-start">
                    <Label htmlFor="email">
                      Exam Name <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Input placeholder="Type here . . ." className="mt-1" />
                </div>
                <div>
                  <div className="flex justify-start">
                    <Label htmlFor="course">
                      Pursuing <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Input placeholder="Branch . . ." className="mt-1" />
                </div>
                <div>
                  <div className="flex justify-start ">
                    <Label htmlFor="Date">
                      Date <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  {/* <Input
                    placeholder="DD/MM/YYYY"
                    className="mt-1"
                    type="date"
                  /> */}
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal dark:bg-black dark:border-zinc-800 dark:text-zinc-400",
                            !date &&
                              "text-muted-foreground mt-1 dark:bg-black dark:border-zinc-800 focus:outline"
                          )}
                        >
                          <CalendarIcon className="dark:text-zinc-600 " />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span className="dark:text-zinc-400">
                              Pick a date
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 dark:bg-black dark:border-zinc-800"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="dark:bg-black dark:text-white "
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <div className="flex justify-start">
                    <Label htmlFor="Duration">
                      Duration <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Input
                    placeholder="Enter duration . . ."
                    className="mt-1"
                    type="number"
                  />
                </div>
                <div>
                  <div className="flex justify-start">
                    <Label htmlFor="Attempts">
                      Attempts <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Input placeholder="0" type="number" className="mt-1" />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="dark:bg-zinc-800 dark:border-zinc-800">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>
                <Link to="Question">Continue</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InputField from "@/components/elements/SimpleFormField";
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
              <AlertDialogTitle className="text-2xl">
                Exam Instruction
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="lg:grid lg:grid-cols-2 gap-2 pt-5 lg:space-y-2 space-y-4">
                  <div className="mt-2">
                    <InputField
                      id="userAttempts"
                      label="Exam Name"
                      placeholder="Enter here . . ."
                      required={true}
                    />
                  </div>
                  <div>
                    <InputField
                      id="userAttempts"
                      label="Class"
                      placeholder="Branch . . ."
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="flex justify-start mt-1">
                      <Label htmlFor="Date">
                        Date <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <div className="pt-0.5 shadow-sm">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal dark:bg-black dark:border-zinc-800 dark:text-gray-200 mt-2 border-gray-300",
                              !date &&
                                "text-muted-foreground mt-2 dark:bg-black dark:border-zinc-800 focus:outline border-gray-300 "
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
                    <InputField
                      id="userAttempts"
                      label="Attempts"
                      placeholder="Enter Duration . . ."
                      required={true}
                      type="number"
                    />
                  </div>
                  <div>
                    <InputField
                      id="userAttempts"
                      label="Attempts"
                      placeholder="0"
                      required={true}
                      type="number"
                    />
                  </div>
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

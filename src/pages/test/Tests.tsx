import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import AddTestForm from "./AddTestForm"
import TestListing from "./TestListing"

export default function Tests() {
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h1 className="text-2xl font-semibold">Tests</h1>
        {/* Modal for Add Test */}
        <AddTest />
      </div>
      <div>
        <TestListing />
      </div>
    </div>
  )
}

function AddTest() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="dark:bg-white">Add Test</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-none dark:bg-zinc-900">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Exam Instruction</AlertDialogTitle>
          <AlertDialogDescription>
            <AddTestForm />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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
function AddTest() {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="dark:bg-white">Add Test</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:bg-zinc-900 border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Exam Instruction</AlertDialogTitle>
            <AlertDialogDescription>
              <AddTestForm />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AddTest

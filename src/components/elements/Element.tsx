// Atomic Design Principles
//!ATOMS Molecules Templates Screens Pages

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

//wrap this inside alert dialog component and use state variable
//to toggle it when TriggerComponent is hit

export const ResponseComponent = ({ response }: { response: any }) => {
  async function copyContent() {
    window.navigator.clipboard.writeText(JSON.stringify(response, null, 2))
    console.log("json", await window.navigator.clipboard.readText())
  }

  return (
    <AlertDialogContent className="mt-20 top-48">
      <AlertDialogHeader>
        <AlertDialogTitle>Request Body</AlertDialogTitle>
        <AlertDialogDescription>
          <pre className="p-4 mt-2 rounded-md text-wrap bg-slate-600">
            <code className="text-white">{JSON.stringify(response, null, 2)}</code>
          </pre>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={copyContent}>Copy JSON</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

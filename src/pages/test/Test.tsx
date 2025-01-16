import TestCard from "./TestCard"
import AddTest from "./AddTest"

export default function Test() {
  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <h1 className="text-2xl font-semibold">Tests</h1>
        {/* Modal for Add Test */}
        <AddTest />
      </div>
      {/* Test Card  */}
      <div>
        <TestCard />
      </div>
    </div>
  )
}

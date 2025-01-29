import MultipleSelector from "@/components/ui/multiple-selector"

import {OPTIONS} from "@/lib/constants"

const MultipleSelectorCreatable = ({ onChange }: { onChange: any }) => {
  return (
    <div className="w-full mt-10">
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select or type category..."
        creatable
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>
        }
        onChange={onChange}
      />
    </div>
  )
}

export default MultipleSelectorCreatable

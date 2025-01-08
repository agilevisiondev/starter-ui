// inputs - text, number, email,
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

const InputField = ({
  id = "Attempts",
  label = "Attempts",
  placeholder = "0",
  required = true,
  className = "",
  type = "text",
}) => {
  return (
    <div>
      <div className="flex justify-start">
        <Label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      </div>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm dark:text-gray-200 sm:text-sm ${className}`}
      />
    </div>
  );
};

export default InputField;

// options - radio, checkbox, range, select, multiselect

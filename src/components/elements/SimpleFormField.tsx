// inputs - text, number, email,
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

const InputField = ({
  id = "Attempts",
  label = "",
  placeholder = "0",
  required = false,
  className = "",
  type = "text",
}) => {
  return (
    <div>
      <div className="flex justify-start">
        <Label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// interface SimpleFormField {
//   form: any;
//   type: string;
//   name: string;
//   label: string;
//   required?: boolean;
//   disabled?: boolean;
//   className?: string;
// }

// export default function SimpleFormField({
//   form,
//   type,
//   name,
//   label,
//   required = false,
//   disabled = false,
//   className,
// }: SimpleFormField) {
//   switch (type) {
//     case "email":
//       return (
//         <FormField
//           control={form.control}
//           name={name}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 {label} {required && <Required />}
//               </FormLabel>
//               <FormControl>
//                 <Input type={type} {...field} placeholder="email@example.com" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       );
//     case "password":
//       const [visible, setVisible] = useState(false);
//       const iconClass = "self-center w-5 h-5 -ml-10 cursor-pointer";
//       return (
//         <FormField
//           control={form.control}
//           name={name}
//           render={({ field }) => (
//             <FormItem>
//               <div className="flex items-center justify-between">
//                 <FormLabel>
//                   {label} {required && <Required />}
//                 </FormLabel>
//                 <Link to="#" className="text-sm underline-offset-2 hover:underline">
//                   Forgot Password?
//                 </Link>
//               </div>
//               <div className="flex">
//                 <FormControl>
//                   <Input type={visible ? "text" : "password"} {...field} />
//                 </FormControl>
//                 {visible ? (
//                   <Eye className={iconClass} onClick={() => setVisible(!visible)} />
//                 ) : (
//                   <EyeOff className={iconClass} onClick={() => setVisible(!visible)} />
//                 )}
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       );
//     default:
//       return (
//         <FormField
//           control={form.control}
//           name={name}
//           render={() => (
//             <FormItem>
//               <FormLabel>
//                 {label}
//                 {required && <Required />}
//               </FormLabel>
//               <FormControl>
//                 <Input type="text" />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       );
//   }
// }

// const Required = () => <span className="ml-px text-red-500">*</span>;

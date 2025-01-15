import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useId, useEffect, useState } from "react"
import DashboardPage from "@/layouts/DashboardPage"
import { zodResolver } from "@hookform/resolvers/zod"
import SimpleFormField from "@/components/elements/SimpleFormField"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
export default function Profile() {
  const [displayTheme, setDisplayTheme] = useState<"light" | "dark">("light")
  const initialValue = {
    id: useId(),
    name: "",
    email: "",
    dateOfBirth: "",
    bio: "", //character limit 200 and optional,
    links: "", // can be multiple
    font: "Poppins",
    theme: "light" as "light",
    activeModules: [], // eg. courses, tests, reports
  }
  const ProfileSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty({ message: "Username cannot be empty" }),
    email: z.string().email({ message: "Must be a valid email address" }),
    dateOfBirth: z.string().nonempty({ message: "Please enter your DOB" }),
    bio: z.string().max(200, { message: "Bio should not exceed 200 characters." }),
    links: z.string().nonempty({ message: "Enter at least one URL" }),
    font: z.string().nonempty({ message: "Please Select a font" }),
    theme: z.enum(["light", "dark"]),
    activeModules: z.array(z.number()).nonempty({ message: "Please select a module." }),
  })
  type ProfileType = z.infer<typeof ProfileSchema>
  const ProfileForm = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: initialValue,
  })
  const profileData = ProfileForm.getValues()
  console.log(profileData)
  function onSubmitProfileForm(values: ProfileType) {
    console.log(values, JSON.stringify(ProfileForm.getValues()))
  }
  useEffect(() => {
    console.log(ProfileForm.watch("id"))
  }, [
    ProfileForm.watch("name"),
    ProfileForm.watch("email"),
    ProfileForm.watch("dateOfBirth"),
    ProfileForm.watch("bio"),
    ProfileForm.watch("links"),
    ProfileForm.watch("font"),
    ProfileForm.watch("activeModules"),
  ])
  const handleThemeChange = (selectedTheme: "light" | "dark") => {
    setDisplayTheme(selectedTheme)
    ProfileForm.setValue("theme", selectedTheme)
  }
  return (
    <DashboardPage className="max-w-lg">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-gray-500 mb-6 text-sm">Manage your account settings and set e-mail preferences.</p>
      <hr />
      <Form {...ProfileForm}>
        <form onSubmit={ProfileForm.handleSubmit(onSubmitProfileForm)}>
          <div className="mt-8 space-y-6 max-w-lg">
            <SimpleFormField
              form={ProfileForm}
              label="Username"
              type="text"
              required
              name="name"
              placeholder="Enter username..."
            />
            <SimpleFormField
              form={ProfileForm}
              label="Email"
              type="email"
              required
              name="email"
              placeholder="Enter email..."
            />
            <SimpleFormField
              form={ProfileForm}
              label="Date Of Birth"
              type="text"
              required
              name="dateOfBirth"
              placeholder="Enter date of birth..."
            />
            <SimpleFormField
              form={ProfileForm}
              label="Bio"
              type="text"
              required
              name="bio"
              placeholder="Enter your bio..."
            />
            <SimpleFormField
              form={ProfileForm}
              label="URLs"
              type="text"
              required
              name="links"
              placeholder="Enter url..."
            />
            <AdvancedFormField form={ProfileForm} type="font" name="font" label="Fonts" />
            <div>
              <h2 className="text-sm font-medium mb-2">Theme</h2>
              <div className="flex gap-4">
                <Theme
                  outerBg="bg-gray-200"
                  innerBg="bg-white"
                  className="bg-gray-100"
                  selected={displayTheme === "light"}
                  onClick={() => handleThemeChange("light")}
                />
                <Theme
                  outerBg="bg-gray-700"
                  innerBg="bg-gray-900"
                  className="bg-gray-800"
                  selected={displayTheme === "dark"}
                  onClick={() => handleThemeChange("dark")}
                />
              </div>
            </div>
            <AdvancedFormField form={ProfileForm} type="activeModules" name="activeModules" label="Display" />
          </div>
          <Button type="submit" className="mt-6">
            Update Profile
          </Button>
        </form>
      </Form>
    </DashboardPage>
  )
}
interface ThemeProps {
  className: string
  outerBg: string
  innerBg: string
  onClick: any
  selected: boolean
}
const Theme = ({ outerBg, innerBg, className, onClick, selected }: ThemeProps) => {
  const skeletonStyle = `h-4 rounded-full w-3/5 ${className}`
  const skeletonInnerStyle = `h-4 rounded-full w-full ${className}`
  const borderStyle = selected ? "ring-4 ring-blue-200" : ""
  return (
    <button
      className={`flex flex-col items-center rounded-lg transition-all ${borderStyle}`}
      type="button"
      onClick={onClick}
    >
      <div className={`p-1 rounded-lg ${outerBg}`}>
        <div className={`w-52 h-30 rounded-lg p-4 ${innerBg}`}>
          <div className="space-y-4">
            <div className={skeletonStyle}></div>
            <div className={skeletonInnerStyle}></div>
            <div className="flex items-center gap-2">
              <div className={skeletonStyle}></div>
              <div className={skeletonInnerStyle}></div>
            </div>
            <div className="flex items-center gap-2">
              <div className={skeletonStyle}></div>
              <div className={skeletonInnerStyle}></div>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
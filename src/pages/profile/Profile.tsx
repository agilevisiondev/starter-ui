import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useId } from "react"
import DashboardPage from "@/layouts/DashboardPage"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Theme, useTheme } from "@/components/theme-provider"
import SimpleFormField from "@/components/elements/SimpleFormField"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import { Skeleton } from "@/components/ui/skeleton"
// import { Label } from "@/components/ui/label"

export default function Profile() {
  const { theme } = useTheme()

  const initialValue = {
    id: useId(),
    username: "",
    email: "",
    dateOfBirth: "",
    bio: "", //character limit 15- 200 and optional,
    links: "",
    font: "Poppins",
    theme: theme,
    activeModules: [], // eg. courses, tests, reports
  }

  const ProfileSchema = z.object({
    id: z.string().nonempty(),
    username: z.string().nonempty({ message: "Username cannot be empty" }),
    email: z.string().email({ message: "Must be a valid email address" }),
    dateOfBirth: z.string().nonempty({ message: "Please select your DOB" }),
    bio: z.string().min(15).max(200, { message: "Only 200 characters allowed." }),
    links: z.string().url().nonempty({ message: "Please enter  URL" }),
    font: z.string().nonempty({ message: "Please select a font" }),
    theme: z.enum([Theme.DARK, Theme.LIGHT, Theme.SYSTEM]),
    activeModules: z.array(z.string()).nonempty({ message: "Please select a module." }),
  })

  type ProfileFormType = z.infer<typeof ProfileSchema>

  const ProfileForm = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: initialValue,
  })

  function onSubmitProfileForm(values: ProfileFormType) {
    console.log(values, JSON.stringify(ProfileForm.getValues()))
  }

  return (
    <DashboardPage className="max-w-xl">
      <DashboardPageTitle title="Settings" subTitle="Manage your account settings and set e-mail preferences." />
      <Form {...ProfileForm}>
        <form onSubmit={ProfileForm.handleSubmit(onSubmitProfileForm)} noValidate>
          <div className="space-y-4">
            <SimpleFormField
              form={ProfileForm}
              label="Username"
              type="text"
              name="username"
              placeholder="Enter username..."
            />
            <SimpleFormField form={ProfileForm} type="email" name="email" label="Email" placeholder="Enter email..." />
            <AdvancedFormField form={ProfileForm} type="date" name="dateOfBirth" label="Date of Birth" />
            <SimpleFormField
              form={ProfileForm}
              type="textarea"
              name="bio"
              label="Bio"
              placeholder="Enter your bio..."
            />
            <SimpleFormField form={ProfileForm} label="URLs" type="url" name="links" placeholder="Enter url..." />
            <AdvancedFormField form={ProfileForm} type="font" name="font" label="Fonts" />
            {/* <div className="space-y-1">
              <Label>Theme</Label>
              <div className="flex gap-x-4 w-fit">
                <ThemeSelector variant="light" form={ProfileForm} />
                <ThemeSelector variant="dark" form={ProfileForm} />
              </div>
            </div> */}
            <AdvancedFormField form={ProfileForm} type="modules" name="activeModules" label="Display" />
          </div>
          <Button type="button" className="mt-6">
            Update Profile
          </Button>
        </form>
      </Form>
    </DashboardPage>
  )
}

export function ThemeSelector({ variant, form }: { variant: string; form: any }) {
  const isDarkMode = variant === "dark"
  const bgColor = isDarkMode ? "bg-gray-600" : "bg-gray-200"
  const cardColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const { setTheme } = useTheme()

  function toggleTheme() {
    form.setValue("theme", isDarkMode ? Theme.DARK : Theme.LIGHT)
    setTheme(isDarkMode ? Theme.DARK : Theme.LIGHT)
  }

  return (
    <button type="button" className="flex flex-col items-center transition-all rounded-lg" onClick={toggleTheme}>
      <div className={`space-x-4 p-1 rounded-lg ${bgColor}`}>
        <div className={`px-3 py-4 space-x-2  flex ${cardColor}`}>
          <Skeleton className="w-8 h-8 rounded-full animate-none" />
          <div className="space-y-2">
            <Skeleton className="w-3/5 h-3 animate-none" />
            <Skeleton className="h-3 w-44 animate-none" />
            <Skeleton className="h-3 w-44 animate-none" />
          </div>
        </div>
      </div>
    </button>
  )
}

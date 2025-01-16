import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useId, useEffect } from "react"
import DashboardPage from "@/layouts/DashboardPage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "@/components/theme-provider"
import SimpleFormField from "@/components/elements/SimpleFormField"
import AdvancedFormField from "@/components/elements/AdvancedFormField"
import { Skeleton } from "@/components/ui/skeleton"

export default function Profile() {
  const { setTheme } = useTheme()

  const initialValue = {
    id: useId(),
    name: "",
    email: "",
    dateOfBirth: "",
    bio: "", //character limit 200 and optional,
    links: "", // can be multiple
    font: "Poppins",
    theme: (localStorage.getItem("theme") as "light" | "dark") ?? "light",
    activeModules: [], // eg. courses, tests, reports
  }

  const ProfileSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty({ message: "Username cannot be empty" }),
    email: z.string().email({ message: "Must be a valid email address" }),
    dateOfBirth: z.string().nonempty({ message: "Please select your DOB" }),
    bio: z.string().max(200, { message: "Only 200 characters allowed." }),
    links: z.string().nonempty({ message: "Enter at least one URL" }),
    font: z.string().nonempty({ message: "Please Select a font" }),
    theme: z.enum(["light", "dark"]),
    activeModules: z.array(z.string()).nonempty({ message: "Please select a module." }),
  })

  type ProfileFormType = z.infer<typeof ProfileSchema>

  const ProfileForm = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: initialValue,
  })

  const profileData = ProfileForm.getValues()
  console.log(profileData)

  function onSubmitProfileForm(values: ProfileFormType) {
    console.log(values, JSON.stringify(ProfileForm.getValues()))
    setTheme(values.theme)
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

  useEffect(() => {
    const selectedTheme = ProfileForm.watch("theme")
    if (selectedTheme) {
      setTheme(selectedTheme)
    }
  }, [ProfileForm.watch("theme")])

  return (
    <DashboardPage className="max-w-lg">
      <h1 className="text-2xl font-semibold mb-1">Settings</h1>
      <p className="dark:text-gray-400 text-gray-700 mb-5 text-sm">
        Manage your account settings and set e-mail preferences.
      </p>
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
            <AdvancedFormField form={ProfileForm} type="dateOfBirth" name="dateOfBirth" label="Date of Birth" />
            <SimpleFormField
              form={ProfileForm}
              label="Bio"
              type="textarea"
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
                <SkeletonDemo
                  background="bg-gray-200"
                  innerbackground="bg-white"
                  onClick={() => ProfileForm.setValue("theme", "light")}
                />
                <SkeletonDemo
                  background="bg-gray-700"
                  innerbackground="bg-gray-900"
                  onClick={() => ProfileForm.setValue("theme", "dark")}
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

interface SkeletonDemoProps {
  background: string
  innerbackground: string
  onClick: () => void
}

export function SkeletonDemo({ background, innerbackground, onClick }: SkeletonDemoProps) {
  return (
    <button className="flex flex-col items-center rounded-lg transition-all" type="button" onClick={onClick}>
      <div className={`space-x-4 p-1 rounded-lg ${background}`}>
        <div className={`px-3 py-4 space-x-2 ${innerbackground} rounded-lg flex`}>
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-3 w-44" />
            <Skeleton className="h-3 w-44" />
          </div>
        </div>
      </div>
    </button>
  )
}

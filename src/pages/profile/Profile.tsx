import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useId, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import DashboardPage from "@/layouts/DashboardPage"
import DashboardPageTitle from "@/components/elements/DashboardPageTitle"

export default function Profile() {
  const initialValue = {
    id: useId(),
    name: "Shubham",
    email: "shubham.jha@shipglobal.in",
    dateOfBirth: "",
    bio: "", //character limit 200 and optional,
    links: "", // can be multiple
    font: "Inter",
    theme: "dark",
    activeModules: [], // eg. courses, tests, reports
  }
  const [user, setUser] = useState(initialValue)

  const form = useForm()

  return (
    <DashboardPage className="max-w-lg">
      <DashboardPageTitle title="Settings" subTitle="Manage your account settings and set e-mail preferences." />
      <Form {...form}>
        <form>
          <div className="mt-8 space-y-6 max-w-lg">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username . . ." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email . . ." type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter date of birth . . ." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your bio . . ." className="h-14" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="urls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URLs</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter url . . ." type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="fonts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonts</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a font to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="popins">Popins</SelectItem>
                      <SelectItem value="helvetica">Helvetica</SelectItem>
                      <SelectItem value="inter">Inter</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h2 className="text-sm font-medium mb-2">Theme</h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex flex-col items-center rounded-lg transition-all
            `}
                >
                  <div className="bg-gray-200 p-1 rounded-lg">
                    <div className="w-52 h-30 bg-white rounded-lg p-4">
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-100 rounded-full"></div>
                          <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-100 rounded-full"></div>
                          <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className={`flex flex-col items-center rounded-lg transition-all
           `}
                >
                  <div className="bg-gray-700 p-1 rounded-lg">
                    <div className="w-52 h-30 bg-gray-900 rounded-lg p-4">
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-800 rounded-full w-3/4"></div>
                        <div className="h-4 bg-gray-800 rounded-full w-full"></div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-800 rounded-full"></div>
                          <div className="h-4 bg-gray-800 rounded-full w-2/3"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 bg-gray-800 rounded-full"></div>
                          <div className="h-4 bg-gray-800 rounded-full w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <FormField
              control={form.control}
              name="urls"
              render={() => (
                <FormItem>
                  <FormLabel>Display</FormLabel>
                  <FormDescription className="text-sm">
                    Turn items on or off to control what's displayed in the app.
                  </FormDescription>
                  <FormControl>
                    <div className="flex space-x-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Course
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Test
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Report
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="button" className="mt-6">
            Update Profile
          </Button>
        </form>
      </Form>
    </DashboardPage>
  )
}

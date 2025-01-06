import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Profile() {
  const initialValue = {
    id: React.useId(),
    name: "Shubham",
    email: "shubham.jha@shipglobal.in",
    dateOfBirth: "",
    bio: "", //character limit 200 and optional,
    links: "", // can be multiple
    font: "Inter",
    theme: "dark",
    activeModules: [], // eg. courses, tests, reports
  };

  const form = useForm();
  return (
    <div className="mx-4 max-w-lg">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="text-gray-500 mb-6 text-sm">
        This is how others will see you on the site.
      </p>
      <hr />
      <Form {...form}>
        <form>
          <div className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username . . ." {...field} />
                  </FormControl>
                  <FormDescription className="text-sm">
                    This is your public display name. It can be your real name
                    or a pseudonym. You can only change this once every 30 days.
                  </FormDescription>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your email settings.
                  </FormDescription>
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
                    <Input
                      placeholder="Enter your bio . . ."
                      className="h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm">
                    You can @mention other users and organizations to link to
                    them.
                  </FormDescription>
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
                    <FormDescription className="text-sm">
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Enter url . . ."
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" size="sm" className="mt-2">
                Add URL
              </Button>
            </div>
          </div>
          <Button type="submit" className="mt-6">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}

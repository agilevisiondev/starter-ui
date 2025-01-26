import { LoginForm } from "@/pages/auth/login-form"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-svh bg-muted md:p-10 dark:bg-zinc-800">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
        <div className="mt-6 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary dark:text-zinc-400">
          By clicking continue, you agree to our <Link to="#">Terms of Service</Link> and{" "}
          <Link to="#">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  )
}

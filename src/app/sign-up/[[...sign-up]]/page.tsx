import { SignUp } from "@clerk/nextjs";

export const runtime = "edge";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp signInUrl='/sign-in' />
    </div>
  )
}

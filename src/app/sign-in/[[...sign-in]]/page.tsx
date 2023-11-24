import { SignIn } from "@clerk/nextjs";

export const runtime = "edge";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn signUpUrl='/sign-up' />
    </div>
  )
}

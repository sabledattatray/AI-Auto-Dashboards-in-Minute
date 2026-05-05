import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-4">
      <SignUp />
    </div>
  );
}

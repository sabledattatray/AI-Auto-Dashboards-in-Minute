import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-4">
      <div className="min-h-[600px] min-w-[320px] flex items-center justify-center border-2 border-dashed border-blue-500/30 rounded-3xl p-8 bg-white">
        <SignIn />
      </div>
    </div>
  );
}

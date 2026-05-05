import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] flex-col p-4">
      <h1 className="text-orange-500 text-4xl font-black mb-8 animate-pulse">DIAGNOSTIC: LOGIN CONTAINER</h1>
      <div className="min-h-[500px] min-w-[320px] flex items-center justify-center border-2 border-orange-500 rounded-3xl p-8 bg-slate-900">
        <SignIn />
      </div>
    </div>
  );
}

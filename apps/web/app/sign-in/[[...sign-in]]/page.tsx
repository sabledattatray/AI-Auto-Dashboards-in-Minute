import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-4">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-2xl border border-slate-800 bg-[#0f172a] text-white",
          }
        }}
      />
    </div>
  );
}

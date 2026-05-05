import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-[#020617] p-4">
      <div className="w-full max-w-md p-1 rounded-2xl bg-gradient-to-b from-blue-500/20 to-transparent">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "bg-[#0f172a] border border-slate-800 shadow-2xl w-full",
              headerTitle: "text-white font-bold text-2xl",
              headerSubtitle: "text-slate-400",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm",
              socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-white",
              socialButtonsBlockButtonText: "text-white font-medium",
              formFieldLabel: "text-slate-200",
              formFieldInput: "bg-slate-800 border-slate-700 text-white",
            }
          }}
        />
      </div>
    </div>
  );
}

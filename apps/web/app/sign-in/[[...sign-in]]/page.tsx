import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-4">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#0f172a] border border-slate-800 shadow-2xl",
            headerTitle: "text-slate-100",
            headerSubtitle: "text-slate-400",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case transition-all",
            socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700",
            socialButtonsBlockButtonText: "text-slate-200 font-medium",
            formFieldLabel: "text-slate-300",
            formFieldInput: "bg-slate-800 border-slate-700 text-slate-100 focus:border-blue-500",
            footerActionLink: "text-blue-400 hover:text-blue-300",
            dividerLine: "bg-slate-800",
            dividerText: "text-slate-500",
          }
        }}
      />
    </div>
  );
}

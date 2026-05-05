import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-[#020617] p-4 text-white">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#0f172a] border border-slate-800 shadow-2xl text-white",
            headerTitle: "text-white font-bold",
            headerSubtitle: "text-slate-400",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
            socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-white hover:bg-slate-700",
            socialButtonsBlockButtonText: "text-white font-medium",
            formFieldLabel: "text-slate-200",
            formFieldInput: "bg-slate-800 border-slate-700 text-white focus:border-blue-500",
            footerActionLink: "text-blue-400 hover:text-blue-300",
            dividerLine: "bg-slate-800",
            dividerText: "text-slate-400",
          }
        }}
      />
    </div>
  );
}

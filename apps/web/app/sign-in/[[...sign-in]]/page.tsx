import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617]">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
            card: 'bg-[#0f172a] border border-slate-800',
            headerTitle: 'text-slate-100',
            headerSubtitle: 'text-slate-400',
            socialButtonsBlockButton: 'bg-[#1e293b] border-slate-700 text-slate-200 hover:bg-[#334155]',
            socialButtonsBlockButtonText: 'text-slate-200',
            dividerLine: 'bg-slate-800',
            dividerText: 'text-slate-500',
            formFieldLabel: 'text-slate-300',
            formFieldInput: 'bg-[#1e293b] border-slate-700 text-slate-100',
            footerActionText: 'text-slate-400',
            footerActionLink: 'text-blue-400 hover:text-blue-300',
          }
        }}
      />
    </div>
  );
}

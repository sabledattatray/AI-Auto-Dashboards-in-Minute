'use client';

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export function ClerkAuthStatus() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkKey) return null;
  
  return <ClerkAuthStatusInternal />;
}

function ClerkAuthStatusInternal() {
  const { isSignedIn } = useUser();
  
  if (isSignedIn) {
    return (
      <UserButton 
        appearance={{
          elements: {
            userButtonAvatarBox: "h-8 w-8 rounded-xl border border-white/10 shadow-lg",
            userButtonPopoverCard: "bg-[#0f172a] border border-slate-800 text-slate-200",
          }
        }}
      />
    );
  }
  
  return (
    <SignInButton mode="modal">
      <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
        Sign In
      </button>
    </SignInButton>
  );
}

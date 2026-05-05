import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/components/providers/TRPCProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuminaBI | Ultra Premium Analytics Dashboard",
  description: "Experience insight at the speed of thought. Professional-grade analytics, seamless data integration, and high-fidelity visualizations.",
  keywords: ["analytics", "dashboard", "BI", "data visualization", "LuminaBI", "SaaS"],
  authors: [{ name: "LuminaBI Team" }],
  openGraph: {
    title: "LuminaBI | Ultra Premium Analytics",
    description: "Insight at the speed of thought. Professional-grade analytics dashboard.",
    url: "https://luminabi.vercel.app",
    siteName: "LuminaBI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LuminaBI Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuminaBI | Ultra Premium Analytics",
    description: "Insight at the speed of thought. Professional-grade analytics dashboard.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use the real key if available, otherwise a dummy key to satisfy build-time requirements
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YnVpbGQtb25seS1rZXktZG8tbm90LXVzZS1pbi1wcm9kCg";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ClerkProvider publishableKey={clerkKey}>
          <TRPCProvider>{children}</TRPCProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

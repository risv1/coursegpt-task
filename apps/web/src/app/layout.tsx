import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "CourseGPT",
  description: "CourseGPT is a powerful AI tool that helps you learn and understand complex topics.",
  icons: {
    icon: "/images/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-neutral-950">
          <ThemeProvider attribute="class" enableSystem>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

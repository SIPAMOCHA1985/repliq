import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REPLIQ — AI Chatbot for Local Businesses",
  description: "Create a custom AI chatbot for your business in 10 minutes. No code. Capture leads and answer customer questions 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

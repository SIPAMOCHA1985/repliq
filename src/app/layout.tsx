import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepliQio — AI Chatbot for Local Businesses",
  description: "Create a custom AI chatbot for your business in 10 minutes. No code. Capture leads and answer customer questions 24/7.",
  metadataBase: new URL("https://repliqio.com"),
  openGraph: {
    title: "RepliQio — AI Chatbot for Local Businesses",
    description: "Create a custom AI chatbot for your business in 10 minutes. No code. Capture leads and answer customer questions 24/7.",
    url: "https://repliqio.com",
    siteName: "RepliQio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepliQio — AI Chatbot for Local Businesses",
    description: "Create a custom AI chatbot for your business in 10 minutes. No code required.",
  },
  robots: {
    index: true,
    follow: true,
  },
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

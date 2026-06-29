import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farrel Diego Akbar - Portofolio Website",
  description: "Official Neobrutalism Portfolio website of Farrel Diego Akbar, a professional Web Developer.",
  keywords: ["Farrel Diego Akbar", "Farrel Diego", "Farrel Portfolio", "Web Developer Portofolio", "Neobrutalism Portfolio", "Next.js Portofolio"],
  authors: [{ name: "Farrel Diego Akbar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased scroll-smooth overflow-x-hidden`}>
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-neo-pink selection:text-white overflow-x-hidden bg-neo-bg text-black">
        {children}
      </body>
    </html>
  );
}

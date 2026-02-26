import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Simple Pokédex built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-red-100 via-white to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Jersey_10 } from 'next/font/google';

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Simple Pokédex built with Next.js",
};

const jersey10 = Jersey_10({
  weight: '400',          
  subsets: ['latin'],
  variable: '--font-jersey',
});


export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={jersey10.variable}>
      <body className="bg-gradient-to-b from-red-100 via-white to-gray-100 min-h-screen">
        <div className="max-w-9xl">
          {children}
          {modal}
        </div>
      </body>
    </html>
  );
}

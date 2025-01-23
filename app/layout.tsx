import type { Metadata } from "next";
import localFont from "next/font/local";
import "./_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import Header from "./components/Header";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Customer website",
    template: "%s - Book luxury cabins",
  },
  description: "Book luxury cabins in beautiful locations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} ${geistMono.variable} antialiased text-primary-100 min-h-screen bg-primary-950 flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto  bg-red-400">{children}</main>
        </div>
      </body>
    </html>
  );
}

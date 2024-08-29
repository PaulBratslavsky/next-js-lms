import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

import { getUserMeLoader } from "@/data/services/get-user-me-loader";

import { Header } from "@/components/custom/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function loader() {
  const user = await getUserMeLoader();
  return user?.data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user  = await loader();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <Header user={user} />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}

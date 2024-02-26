import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Napster",
  description: "Jams for days",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>

      <Toaster
        icons={{
          success: null,
          error: "👎",
          warning: "⚠️",
          info: "ℹ️",
        }}
        toastOptions={{
          unstyled: true,
          classNames: {
            success: "toast alert alert-info bg-black text-gray-400",
            error: "bg-red-500",
            warning: "bg-yellow-500",
            info: "bg-blue-500",
          },
        }}
      />
    </html>
  );
}

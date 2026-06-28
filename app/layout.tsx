import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuthToolkit Identity Starter",
  description: "A simple starter app for AuthToolkit Identity."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "material-icons/iconfont/material-icons.css"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeartRead",
  description: "Assistive tool for ECG Analysis and Heart Arrhythmia diagnosis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en" className="light" >
      <body className={inter.className}>
        appearance={{
          layout: {
            logoImageUrl: "/logo.png"
          },
          variables: {
            colorPrimary: "#0792C3"
          }
        }}
        >
        {children}
      </body>
    </html>
  );
}
